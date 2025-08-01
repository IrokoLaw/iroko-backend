import { Inject, Injectable } from '@nestjs/common';
import { ChatRepositoryPort } from '../../domain/ports/chat.repository.port';
import { DiscussionRepositoryPort } from '../../domain/ports/discussion.repository.port';
import { SourceRepositoryPort } from '../../domain/ports/source.repository.port';
import { Transactional } from 'typeorm-transactional';
import { ChatEntity } from '../../domain/entities/chat/chat.entity';
import { SourceEntity } from '../../domain/entities/source/source.entity';
import { Err, Ok, Result } from 'oxide.ts';
import {
  CreateNewChatRequestDto,
  UpdateChatRequestDto,
} from './create-new-chat.request.dto';
import {
  CHAT_REPOSITORY,
  DISCUSSION_REPOSITORY,
  LLM_QUESTION_ANSWERING,
  SOURCE_REPOSITORY,
} from '../../question-answering.di-token';
import { LLMQuestionAnsweringPort } from '../../domain/ports/llm-question-answering.port';
import { NotFoundException } from '@/libs/exceptions';
import { LegalSubjectEnum } from '../../domain/values-objects/chat-legal-subject-value-object';
import { S3Service } from '@/file-storage/s3.service';
import { AnswerFormattingService } from '../answer-formatting.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(CHAT_REPOSITORY)
    protected readonly chatRepo: ChatRepositoryPort,
    @Inject(DISCUSSION_REPOSITORY)
    protected readonly discussionRepo: DiscussionRepositoryPort,
    @Inject(SOURCE_REPOSITORY)
    protected readonly sourceRepo: SourceRepositoryPort,
    @Inject(LLM_QUESTION_ANSWERING)
    protected readonly llmQuestionAnswering: LLMQuestionAnsweringPort,
    protected readonly s3Service: S3Service,
    private readonly answerFormattingService: AnswerFormattingService,
  ) {}

  @Transactional()
  async addChatToDiscussion(
    data: CreateNewChatRequestDto,
    discussionId: string,
  ): Promise<Result<string, Error>> {
    try {
      const discussion = await this.discussionRepo.findOneById(discussionId);

      if (discussion.isNone()) return Err(new NotFoundException());

      return this.createNewChatAndAddToDiscussion(data, discussionId);
    } catch (error: any) {
      throw error;
    }
  }

  private async createNewChatAndAddToDiscussion(
    data: CreateNewChatRequestDto,
    discussionId: string,
  ): Promise<Result<string, Error>> {
    try {
      const llmResponse = await this.llmQuestionAnswering.getAnswerWithSources({
        question: data.question,
        legalSubjects: data.legalSubjects ?? [LegalSubjectEnum.DEFAULT_LAW],
        documentTypes: data.documentTypes ?? [],
      });

      const pathDocs = await Promise.all(
        llmResponse.documents.map(async (source) => {
          const signedUrl = await this.s3Service.getSignedUrl(source.pathDoc);
          return signedUrl;
        }),
      );

      const chat = ChatEntity.create({
        discussionId: discussionId,
        question: data.question,
        answer: this.answerFormattingService.parseAnswerCitation(
          llmResponse.answer,
          pathDocs,
        ),
        legalSubjects: data.legalSubjects,
        documentTypes: data.documentTypes,
      });

      await this.discussionRepo.transaction(async () => {
        await this.chatRepo.insert(chat);

        const sources = await Promise.all(
          llmResponse.documents.map(async (source) =>
            SourceEntity.create({
              chatId: chat.id,
              legalTextName: source.legalTextName,
              bloc: source.bloc,
              status: source.status,
              chapterNumber: source.chapterNumber,
              articleNumber: source.articleNumber,
              pathDoc: source.pathDoc,
              action: source.action,
              book: source.book,
              title: source.title,
              sectionNumber: source.sectionNumber,
              legalTextType: source.legalTextType,
              titleNumber: source.titleNumber,
              chapter: source.chapter,
              section: source.section,
              pathMetadata: source.pathMetadata,
            }),
          ),
        );

        await this.sourceRepo.insert(sources);
      });

      return Ok(chat.id);
    } catch (error: any) {
      throw error;
    }
  }

  @Transactional()
  async updateChat(
    data: UpdateChatRequestDto,
    chatId: string,
  ): Promise<Result<string, Error>> {
    const chat = await this.chatRepo.findOneById(chatId);
    if (chat.isNone()) return Err(new NotFoundException());

    await this.chatRepo.transaction(async () => {
      // update question, legalSubjects, documentTypes
      await this.chatRepo.updateQuestionFields(chatId, {
        question: data.question,
        legalSubjects: data.legalSubjects,
        documentTypes: data.documentTypes,
      });

      // request to llm to update answer
      const llmResponse = await this.llmQuestionAnswering.getAnswerWithSources({
        question: data.question,
        legalSubjects: data.legalSubjects ?? [LegalSubjectEnum.DEFAULT_LAW],
        documentTypes: data.documentTypes ?? [],
      });

      // delete all sources
      await this.sourceRepo.deleteByChatId(chatId);

      if (llmResponse.documents.length > 0) {
        const pathDocs = await Promise.all(
          llmResponse.documents.map(async (source) => {
            const signedUrl = await this.s3Service.getSignedUrl(source.pathDoc);
            return signedUrl;
          }),
        );

        // update answer
        await this.chatRepo.updateAnswer(
          chatId,
          this.answerFormattingService.parseAnswerCitation(
            llmResponse.answer,
            pathDocs,
          ),
        );

        const sources = await Promise.all(
          llmResponse.documents.map(async (source) =>
            SourceEntity.create({
              chatId: chatId,
              legalTextName: source.legalTextName,
              bloc: source.bloc,
              status: source.status,
              chapterNumber: source.chapterNumber,
              articleNumber: source.articleNumber,
              pathDoc: source.pathDoc,
              action: source.action,
              book: source.book,
              title: source.title,
              sectionNumber: source.sectionNumber,
              legalTextType: source.legalTextType,
              titleNumber: source.titleNumber,
              chapter: source.chapter,
              section: source.section,
              pathMetadata: source.pathMetadata,
            }),
          ),
        );

        // create new sources
        await this.sourceRepo.insert(sources);
      }
    });

    return Ok(chatId);
  }
}
