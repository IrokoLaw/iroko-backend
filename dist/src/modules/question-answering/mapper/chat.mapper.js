"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMapper = exports.chatSchema = void 0;
const zod_1 = require("zod");
const chat_document_type_value_object_1 = require("../domain/values-objects/chat-document-type-value-object");
const chat_legal_subject_value_object_1 = require("../domain/values-objects/chat-legal-subject-value-object");
const common_1 = require("@nestjs/common");
const chat_entity_1 = require("../domain/entities/chat/chat.entity");
const chat_entity_db_1 = require("../infrastructure/persistance/chat.entity.db");
const chat_response_dto_1 = require("../dtos/chat.response.dto");
exports.chatSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    question: zod_1.z.string().min(1),
    answer: zod_1.z.string().min(1),
    documentTypes: zod_1.z.array(zod_1.z.nativeEnum(chat_document_type_value_object_1.DocumentTypeEnum)).optional(),
    legalSubjects: zod_1.z.array(zod_1.z.nativeEnum(chat_legal_subject_value_object_1.LegalSubjectEnum)).optional(),
    discussionId: zod_1.z.string().uuid(),
    evaluationId: zod_1.z.string().uuid().optional(),
});
let ChatMapper = class ChatMapper {
    toDomain(dbEntity) {
        const { id, question, answer, documentTypes, legalSubjects, discussionId, evaluationId, createdAt, updatedAt, } = dbEntity;
        return new chat_entity_1.ChatEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                question,
                answer,
                documentTypes,
                legalSubjects,
                discussionId,
                evaluationId,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            question: copy.question,
            answer: copy.answer,
            documentTypes: copy.documentTypes,
            legalSubjects: copy.legalSubjects,
            discussionId: copy.discussionId,
            evaluationId: copy.evaluationId,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
        };
        exports.chatSchema.parse(record);
        const dbEntity = new chat_entity_db_1.ChatDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        return new chat_response_dto_1.ChatResponseDto(props);
    }
};
exports.ChatMapper = ChatMapper;
exports.ChatMapper = ChatMapper = __decorate([
    (0, common_1.Injectable)()
], ChatMapper);
//# sourceMappingURL=chat.mapper.js.map