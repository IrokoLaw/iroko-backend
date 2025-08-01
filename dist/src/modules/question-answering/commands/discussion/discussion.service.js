"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_transactional_1 = require("typeorm-transactional");
const discussion_entity_1 = require("../../domain/entities/discussion/discussion.entity");
const chat_entity_1 = require("../../domain/entities/chat/chat.entity");
const source_entity_1 = require("../../domain/entities/source/source.entity");
const oxide_ts_1 = require("oxide.ts");
const create_new_chat_request_dto_1 = require("../chat/create-new-chat.request.dto");
const question_answering_di_token_1 = require("../../question-answering.di-token");
const config_1 = require("@nestjs/config");
const chat_legal_subject_value_object_1 = require("../../domain/values-objects/chat-legal-subject-value-object");
const s3_service_1 = require("../../../../file-storage/s3.service");
const answer_formatting_service_1 = require("../answer-formatting.service");
let DiscussionService = class DiscussionService {
    constructor(chatRepo, discussionRepo, sourceRepo, llmQuestionAnswering, s3Service, configService, answerFormattingService) {
        this.chatRepo = chatRepo;
        this.discussionRepo = discussionRepo;
        this.sourceRepo = sourceRepo;
        this.llmQuestionAnswering = llmQuestionAnswering;
        this.s3Service = s3Service;
        this.configService = configService;
        this.answerFormattingService = answerFormattingService;
    }
    async createChat(data) {
        try {
            const discussion = discussion_entity_1.DiscussionEntity.create({
                title: data.question,
                userId: this.configService.get('app.testUserId', { infer: true }),
            });
            const llmResponse = await this.llmQuestionAnswering.getAnswerWithSources({
                question: data.question,
                legalSubjects: data.legalSubjects ?? [chat_legal_subject_value_object_1.LegalSubjectEnum.DEFAULT_LAW],
                documentTypes: data.documentTypes ?? [],
            });
            const pathDocs = await Promise.all(llmResponse.documents.map(async (source) => {
                const signedUrl = await this.s3Service.getSignedUrl(source.pathDoc);
                return signedUrl;
            }));
            await this.discussionRepo.transaction(async () => {
                await this.discussionRepo.insert(discussion);
                const chat = chat_entity_1.ChatEntity.create({
                    question: data.question,
                    answer: this.answerFormattingService.parseAnswerCitation(llmResponse.answer, pathDocs),
                    legalSubjects: data.legalSubjects,
                    documentTypes: data.documentTypes,
                    discussionId: discussion.id,
                });
                await this.chatRepo.insert(chat);
                if (llmResponse.documents.length > 0) {
                    const sources = llmResponse.documents.map((source) => source_entity_1.SourceEntity.create({
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
                    }));
                    await this.sourceRepo.insert(sources);
                }
            });
            return (0, oxide_ts_1.Ok)(discussion.id);
        }
        catch (error) {
            throw error;
        }
    }
    async createDiscussion(data) {
        const discussion = discussion_entity_1.DiscussionEntity.create({
            title: data.title,
            userId: this.configService.get('app.testUserId', { infer: true }),
        });
        await this.discussionRepo.insert(discussion);
        return (0, oxide_ts_1.Ok)(discussion.id);
    }
};
exports.DiscussionService = DiscussionService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_chat_request_dto_1.CreateNewChatRequestDto]),
    __metadata("design:returntype", Promise)
], DiscussionService.prototype, "createChat", null);
exports.DiscussionService = DiscussionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(question_answering_di_token_1.CHAT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(question_answering_di_token_1.DISCUSSION_REPOSITORY)),
    __param(2, (0, common_1.Inject)(question_answering_di_token_1.SOURCE_REPOSITORY)),
    __param(3, (0, common_1.Inject)(question_answering_di_token_1.LLM_QUESTION_ANSWERING)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, s3_service_1.S3Service,
        config_1.ConfigService,
        answer_formatting_service_1.AnswerFormattingService])
], DiscussionService);
//# sourceMappingURL=discussion.service.js.map