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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_transactional_1 = require("typeorm-transactional");
const chat_entity_1 = require("../../domain/entities/chat/chat.entity");
const source_entity_1 = require("../../domain/entities/source/source.entity");
const storage_1 = require("@google-cloud/storage");
const oxide_ts_1 = require("oxide.ts");
const create_new_chat_request_dto_1 = require("./create-new-chat.request.dto");
const question_answering_di_token_1 = require("../../question-answering.di-token");
const exceptions_1 = require("../../../../libs/exceptions");
const s3_service_1 = require("../../../../file-storage/s3.service");
const answer_formatting_service_1 = require("../answer-formatting.service");
const mapper_1 = require("../../infrastructure/llm-question-answering/mapper");
const text_action_object_value_1 = require("../../domain/values-objects/text-action-object-value");
const source_bloc_value_object_1 = require("../../domain/values-objects/source-bloc-value-object");
let ChatService = class ChatService {
    constructor(chatRepo, discussionRepo, sourceRepo, llmQuestionAnswering, s3Service, answerFormattingService) {
        this.chatRepo = chatRepo;
        this.discussionRepo = discussionRepo;
        this.sourceRepo = sourceRepo;
        this.llmQuestionAnswering = llmQuestionAnswering;
        this.s3Service = s3Service;
        this.answerFormattingService = answerFormattingService;
        this.storage = new storage_1.Storage();
        this.bucketName = process.env.GCS_BUCKET_NAME;
    }
    async addChatToDiscussion(data, discussionId) {
        try {
            const discussion = await this.discussionRepo.findOneById(discussionId);
            if (discussion.isNone())
                return (0, oxide_ts_1.Err)(new exceptions_1.NotFoundException());
            return this.createNewChatAndAddToDiscussion(data, discussionId);
        }
        catch (error) {
            throw error;
        }
    }
    async createNewChatAndAddToDiscussion(data, discussionId) {
        try {
            const responseDocument = data.documents.map(mapper_1.LLMQuestionAnsweringSourceToDomainSourceMapper);
            const pathDocs = await Promise.all(responseDocument.map(async (source) => {
                const id = source.reference;
                return { path_doc: id };
            }));
            const answer = typeof data.answer === "string" ? data.answer : "";
            const chat = chat_entity_1.ChatEntity.create({
                question: data.question,
                answer: this.answerFormattingService.parseAnswerCitation(answer, pathDocs),
                legalSubjects: data.legalSubjects,
                documentTypes: data.documentTypes,
                discussionId: discussionId,
            });
            await this.discussionRepo.transaction(async () => {
                await this.chatRepo.insert(chat);
                const sources = await Promise.all(responseDocument.map(async (source) => source_entity_1.SourceEntity.create({
                    chatId: chat.id,
                    legalTextName: source.legalTextName,
                    bloc: source.bloc === "" ? source_bloc_value_object_1.BlocEnum.LEGISLATIVE : source.bloc,
                    status: source.status,
                    chapterNumber: source.chapterNumber,
                    articleNumber: source.articleNumber,
                    pathDoc: source.pathDoc,
                    action: source.action === "" ? text_action_object_value_1.ActionEnum.MODIFICATION : source.action,
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
                })));
                await this.sourceRepo.insert(sources);
            });
            return (0, oxide_ts_1.Ok)(chat.id);
        }
        catch (error) {
            throw error;
        }
    }
    async uploadAudio(file) {
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
        }
        catch (error) {
            throw new Error(`Erreur lors du téléversement: ${error.message}`);
        }
    }
};
exports.ChatService = ChatService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_new_chat_request_dto_1.CreateNewChatRequestDto, String]),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "addChatToDiscussion", null);
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(question_answering_di_token_1.CHAT_REPOSITORY)),
    __param(1, (0, common_1.Inject)(question_answering_di_token_1.DISCUSSION_REPOSITORY)),
    __param(2, (0, common_1.Inject)(question_answering_di_token_1.SOURCE_REPOSITORY)),
    __param(3, (0, common_1.Inject)(question_answering_di_token_1.LLM_QUESTION_ANSWERING)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, s3_service_1.S3Service,
        answer_formatting_service_1.AnswerFormattingService])
], ChatService);
//# sourceMappingURL=chat.service.js.map