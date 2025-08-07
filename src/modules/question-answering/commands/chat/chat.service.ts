import { Inject, Injectable } from "@nestjs/common";
import { ChatRepositoryPort } from "../../domain/ports/chat.repository.port";
import { DiscussionRepositoryPort } from "../../domain/ports/discussion.repository.port";
import { SourceRepositoryPort } from "../../domain/ports/source.repository.port";
import { Transactional } from "typeorm-transactional";
import { ChatEntity } from "../../domain/entities/chat/chat.entity";
import { SourceEntity } from "../../domain/entities/source/source.entity";
import { Storage } from "@google-cloud/storage";
import { Err, Ok, Result } from "oxide.ts";
import { CreateNewChatRequestDto } from "./create-new-chat.request.dto";
import {
  CHAT_REPOSITORY,
  DISCUSSION_REPOSITORY,
  LLM_QUESTION_ANSWERING,
  SOURCE_REPOSITORY,
} from "../../question-answering.di-token";
import { LLMQuestionAnsweringPort } from "../../domain/ports/llm-question-answering.port";
import { NotFoundException } from "@/libs/exceptions";
import { S3Service } from "@/file-storage/s3.service";
import { AnswerFormattingService, Doc } from "../answer-formatting.service";
import { LLMQuestionAnsweringSourceToDomainSourceMapper } from "../../infrastructure/llm-question-answering/mapper";
import {
  ActionEnum,
  SourceAction,
} from "../../domain/values-objects/text-action-object-value";
import { BlocEnum } from "../../domain/values-objects/source-bloc-value-object";

@Injectable()
export class ChatService {
  private storage: Storage;
  private bucketName: string;
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
    private readonly answerFormattingService: AnswerFormattingService
  ) {
    this.storage = new Storage();
    this.bucketName = process.env.GCS_BUCKET_NAME;
  }

  @Transactional()
  async addChatToDiscussion(
    data: CreateNewChatRequestDto,
    discussionId: string
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
    discussionId: string
  ): Promise<Result<string, Error>> {
    try {
      const responseDocument = data.documents.map(
        LLMQuestionAnsweringSourceToDomainSourceMapper
      );
      const pathDocs: Doc[] = await Promise.all(
        responseDocument.map(async (source) => {
          const id = source.reference;
          return { path_doc: id };
        })
      );
      const answer = typeof data.answer === "string" ? data.answer : "";

      const chat = ChatEntity.create({
        question: data.question,
        answer: this.answerFormattingService.parseAnswerCitation(
          answer,
          pathDocs
        ),
        legalSubjects: data.legalSubjects,
        documentTypes: data.documentTypes,
        discussionId: discussionId,
      });

      await this.discussionRepo.transaction(async () => {
        await this.chatRepo.insert(chat);

        const sources = await Promise.all(
          responseDocument.map(async (source) =>
            SourceEntity.create({
              chatId: chat.id,
              legalTextName: source.legalTextName,
              bloc: source.bloc === "" ? BlocEnum.LEGISLATIVE : source.bloc,
              status: source.status,
              chapterNumber: source.chapterNumber,
              articleNumber: source.articleNumber,
              pathDoc: source.pathDoc,
              action:
                source.action === "" ? ActionEnum.MODIFICATION : source.action,
              book: source.book,
              title: source.title,
              sectionNumber: source.sectionNumber,
              legalTextType: source.legalTextType,
              titleNumber: source.titleNumber,
              chapter: source.chapter,
              section: source.section,
              pathMetadata: source.pathMetadata,
              reference: source.reference,
              page: source.page,
            })
          )
        );

        await this.sourceRepo.insert(sources);
      });

      return Ok(chat.id);
    } catch (error: any) {
      throw error;
    }
  }

  async uploadAudio(file: Express.Multer.File): Promise<string> {
    console.log("Uploading file to GCS:");
    const bucket = this.storage.bucket(this.bucketName);
    const fileName = `audio_${Date.now()}.webm`;
    const gcsFile = bucket.file(fileName);
    console.log("Uploading file to GCS:", fileName);
    console.log("File size:", file.buffer, "bytes");

    try {
      await gcsFile.save(file.buffer, {
        metadata: {
          contentType: "audio/webm",
        },
      });

      const [signedUrl] = await gcsFile.getSignedUrl({
        action: "read",
        expires: Date.now() + 24 * 60 * 60 * 1000,
      });
      return signedUrl;
    } catch (error) {
      throw new Error(`Erreur lors du téléversement: ${error.message}`);
    }
  }
}
