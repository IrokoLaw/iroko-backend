import { Logger, Module, Provider } from "@nestjs/common";
import { QuestionAnsweringCommandController } from "./commands/question-answering-command.controller";
import { ChatMapper } from "./mapper/chat.mapper";
import { DiscussionMapper } from "./mapper/discussion.mapper";
import { SourceMapper } from "./mapper/source.mapper";
import { ChatRepository } from "./infrastructure/persistance/repositories/chat.repository";
import { DiscussionRepository } from "./infrastructure/persistance/repositories/discussion.repository";
import { SourceRepository } from "./infrastructure/persistance/repositories/source.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatDbEntity } from "./infrastructure/persistance/chat.entity.db";
import { DiscussionDbEntity } from "./infrastructure/persistance/discussion.entity.db";
import { SourceDbEntity } from "./infrastructure/persistance/source.entity.db";
import { QuestionAnsweringService } from "./commands/question-answering.service";
import {
  CHAT_REPOSITORY,
  DISCUSSION_REPOSITORY,
  EVALUATION_REPOSITORY,
  LLM_QUESTION_ANSWERING,
  SOURCE_REPOSITORY,
} from "./question-answering.di-token";
import { LLMQuestionAnswering } from "./infrastructure/llm-question-answering/llm-question-answering";
import { QuestionAnsweringHandler } from "./queries/question-answering-querie-handler";
import { QuestionAnsweringQueryHttpController } from "./queries/question-answering-queries.controller";
import { EvaluationRepository } from "./infrastructure/persistance/repositories/evaluation.repository";
import { EvaluationMapper } from "./mapper/evaluation.mapper";
import { EvaluationDbEntity } from "./infrastructure/persistance/evaluation.entity.db";
import { S3ClientProvider } from "@/file-storage/s3-client";
import { HttpModule } from "@nestjs/axios";
import { S3Service } from "@/file-storage/s3.service";
import { ChatService } from "./commands/chat/chat.service";
import { DiscussionService } from "./commands/discussion/discussion.service";
import { EvaluationService } from "./commands/evaluation/evaluation.service";
import { AnswerFormattingService } from "./commands/answer-formatting.service";
import { GCSService } from "@/gcs/gcs.service";
import { GCSClient } from "@/gcs/gcs-client";
const httpControllers = [
  QuestionAnsweringCommandController,
  QuestionAnsweringQueryHttpController,
];

const mappers: Provider[] = [
  ChatMapper,
  DiscussionMapper,
  SourceMapper,
  EvaluationMapper,
];
const handlers = [QuestionAnsweringHandler];
const repositories: Provider[] = [
  { provide: CHAT_REPOSITORY, useClass: ChatRepository },
  { provide: DISCUSSION_REPOSITORY, useClass: DiscussionRepository },
  { provide: SOURCE_REPOSITORY, useClass: SourceRepository },
  { provide: EVALUATION_REPOSITORY, useClass: EvaluationRepository },
];

const llmQuestionAnswering: Provider = {
  provide: LLM_QUESTION_ANSWERING,
  useClass: LLMQuestionAnswering,
};

const services: Provider[] = [
  QuestionAnsweringService,
  ChatService,
  DiscussionService,
  EvaluationService,
  AnswerFormattingService,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatDbEntity,
      DiscussionDbEntity,
      SourceDbEntity,
      EvaluationDbEntity,
    ]),
    HttpModule,
  ],
  controllers: [...httpControllers],
  providers: [
    Logger,
    ...services,
    QuestionAnsweringService,
    llmQuestionAnswering,
    S3ClientProvider,
    GCSClient,
    S3Service,
    GCSService,
    ...handlers,
    ...repositories,
    ...mappers,
  ],
  exports: [QuestionAnsweringService],
})
export class QuestionAnsweringModule {}
