import { Inject, Injectable } from '@nestjs/common';
import { DiscussionRepositoryPort } from '../../domain/ports/discussion.repository.port';
import { ChatRepositoryPort } from '../../domain/ports/chat.repository.port';
import { SourceRepositoryPort } from '../../domain/ports/source.repository.port';
import { Transactional } from 'typeorm-transactional';
import { DiscussionEntity } from '../../domain/entities/discussion/discussion.entity';
import { ChatEntity } from '../../domain/entities/chat/chat.entity';
import { SourceEntity } from '../../domain/entities/source/source.entity';
import { Ok, Result } from 'oxide.ts';
import { CreateNewChatRequestDto } from '../chat/create-new-chat.request.dto';
import {
  CHAT_REPOSITORY,
  DISCUSSION_REPOSITORY,
  LLM_QUESTION_ANSWERING,
  SOURCE_REPOSITORY,
} from '../../question-answering.di-token';
import { LLMQuestionAnsweringPort } from '../../domain/ports/llm-question-answering.port';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { LegalSubjectEnum } from '../../domain/values-objects/chat-legal-subject-value-object';
import { S3Service } from '@/file-storage/s3.service';
import { CreateNewDiscussionRequestDto } from './create-new-discussion.request.dto';
import { AnswerFormattingService } from '../answer-formatting.service';

@Injectable()
export class DiscussionService {
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
    private readonly configService: ConfigService<AllConfigType>,
    private readonly answerFormattingService: AnswerFormattingService,
  ) {}

  @Transactional()
  async createChat(
    data: CreateNewChatRequestDto,
  ): Promise<Result<string, Error>> {
    try {
      // step 1: create a new discussion
      const discussion = DiscussionEntity.create({
        title: data.question,
        userId: this.configService.get('app.testUserId', { infer: true }),
      });

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

      await this.discussionRepo.transaction(async () => {
        await this.discussionRepo.insert(discussion);

        const chat = ChatEntity.create({
          question: data.question,
          answer: this.answerFormattingService.parseAnswerCitation(
            llmResponse.answer,
            pathDocs,
          ),
          legalSubjects: data.legalSubjects,
          documentTypes: data.documentTypes,
          discussionId: discussion.id,
        });

        await this.chatRepo.insert(chat);

        if (llmResponse.documents.length > 0) {
          const sources = llmResponse.documents.map((source) =>
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
          );

          await this.sourceRepo.insert(sources);
        }
      });

      return Ok(discussion.id);
    } catch (error: any) {
      throw error;
    }
  }

  async createDiscussion(
    data: CreateNewDiscussionRequestDto,
  ): Promise<Result<string, Error>> {
    const discussion = DiscussionEntity.create({
      title: data.title,
      userId: this.configService.get('app.testUserId', { infer: true }),
    });

    await this.discussionRepo.insert(discussion);

    return Ok(discussion.id);
  }
}
