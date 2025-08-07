"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionAnsweringModule = void 0;
const common_1 = require("@nestjs/common");
const question_answering_command_controller_1 = require("./commands/question-answering-command.controller");
const chat_mapper_1 = require("./mapper/chat.mapper");
const discussion_mapper_1 = require("./mapper/discussion.mapper");
const source_mapper_1 = require("./mapper/source.mapper");
const chat_repository_1 = require("./infrastructure/persistance/repositories/chat.repository");
const discussion_repository_1 = require("./infrastructure/persistance/repositories/discussion.repository");
const source_repository_1 = require("./infrastructure/persistance/repositories/source.repository");
const typeorm_1 = require("@nestjs/typeorm");
const chat_entity_db_1 = require("./infrastructure/persistance/chat.entity.db");
const discussion_entity_db_1 = require("./infrastructure/persistance/discussion.entity.db");
const source_entity_db_1 = require("./infrastructure/persistance/source.entity.db");
const question_answering_service_1 = require("./commands/question-answering.service");
const question_answering_di_token_1 = require("./question-answering.di-token");
const llm_question_answering_1 = require("./infrastructure/llm-question-answering/llm-question-answering");
const question_answering_querie_handler_1 = require("./queries/question-answering-querie-handler");
const question_answering_queries_controller_1 = require("./queries/question-answering-queries.controller");
const evaluation_repository_1 = require("./infrastructure/persistance/repositories/evaluation.repository");
const evaluation_mapper_1 = require("./mapper/evaluation.mapper");
const evaluation_entity_db_1 = require("./infrastructure/persistance/evaluation.entity.db");
const s3_client_1 = require("../../file-storage/s3-client");
const axios_1 = require("@nestjs/axios");
const s3_service_1 = require("../../file-storage/s3.service");
const chat_service_1 = require("./commands/chat/chat.service");
const discussion_service_1 = require("./commands/discussion/discussion.service");
const evaluation_service_1 = require("./commands/evaluation/evaluation.service");
const answer_formatting_service_1 = require("./commands/answer-formatting.service");
const gcs_service_1 = require("../../gcs/gcs.service");
const gcs_client_1 = require("../../gcs/gcs-client");
const httpControllers = [
    question_answering_command_controller_1.QuestionAnsweringCommandController,
    question_answering_queries_controller_1.QuestionAnsweringQueryHttpController,
];
const mappers = [
    chat_mapper_1.ChatMapper,
    discussion_mapper_1.DiscussionMapper,
    source_mapper_1.SourceMapper,
    evaluation_mapper_1.EvaluationMapper,
];
const handlers = [question_answering_querie_handler_1.QuestionAnsweringHandler];
const repositories = [
    { provide: question_answering_di_token_1.CHAT_REPOSITORY, useClass: chat_repository_1.ChatRepository },
    { provide: question_answering_di_token_1.DISCUSSION_REPOSITORY, useClass: discussion_repository_1.DiscussionRepository },
    { provide: question_answering_di_token_1.SOURCE_REPOSITORY, useClass: source_repository_1.SourceRepository },
    { provide: question_answering_di_token_1.EVALUATION_REPOSITORY, useClass: evaluation_repository_1.EvaluationRepository },
];
const llmQuestionAnswering = {
    provide: question_answering_di_token_1.LLM_QUESTION_ANSWERING,
    useClass: llm_question_answering_1.LLMQuestionAnswering,
};
const services = [
    question_answering_service_1.QuestionAnsweringService,
    chat_service_1.ChatService,
    discussion_service_1.DiscussionService,
    evaluation_service_1.EvaluationService,
    answer_formatting_service_1.AnswerFormattingService,
];
let QuestionAnsweringModule = class QuestionAnsweringModule {
};
exports.QuestionAnsweringModule = QuestionAnsweringModule;
exports.QuestionAnsweringModule = QuestionAnsweringModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                chat_entity_db_1.ChatDbEntity,
                discussion_entity_db_1.DiscussionDbEntity,
                source_entity_db_1.SourceDbEntity,
                evaluation_entity_db_1.EvaluationDbEntity,
            ]),
            axios_1.HttpModule,
        ],
        controllers: [...httpControllers],
        providers: [
            common_1.Logger,
            ...services,
            question_answering_service_1.QuestionAnsweringService,
            llmQuestionAnswering,
            s3_client_1.S3ClientProvider,
            gcs_client_1.GCSClient,
            s3_service_1.S3Service,
            gcs_service_1.GCSService,
            ...handlers,
            ...repositories,
            ...mappers,
        ],
        exports: [question_answering_service_1.QuestionAnsweringService],
    })
], QuestionAnsweringModule);
//# sourceMappingURL=question-answering.module.js.map