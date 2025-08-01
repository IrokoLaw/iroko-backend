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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_base_1 = require("../../../libs/api/response.base");
const chat_document_type_value_object_1 = require("../domain/values-objects/chat-document-type-value-object");
const chat_legal_subject_value_object_1 = require("../domain/values-objects/chat-legal-subject-value-object");
class ChatResponseDto extends response_base_1.ResponseBase {
    constructor(props) {
        super(props);
        this.question = props.question;
        this.answer = props.answer;
        this.documentTypes = props.documentTypes;
        this.legalSubjects = props.legalSubjects;
        this.discussionId = props.discussionId;
        this.evaluationId = props.evaluationId;
    }
}
exports.ChatResponseDto = ChatResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Quelle est la loi sur le travail ?',
        description: 'La question posée dans le chat',
    }),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'La loi sur le travail stipule que...',
        description: 'La réponse générée pour la question posée',
    }),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'LEGAL_DOCUMENT',
        description: 'Type du document associé à la réponse',
        enum: chat_document_type_value_object_1.DocumentTypeEnum,
        required: false,
    }),
    __metadata("design:type", Array)
], ChatResponseDto.prototype, "documentTypes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'LABOR_LAW',
        description: 'Domaine du droit auquel se rapporte la réponse',
        enum: chat_legal_subject_value_object_1.LegalSubjectEnum,
        required: false,
    }),
    __metadata("design:type", Array)
], ChatResponseDto.prototype, "legalSubjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Identifiant de la discussion à laquelle appartient ce chat',
    }),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "discussionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'c9d6f8a9-4e2c-4f21-bb62-123456789abc',
        description: "Identifiant de l'évaluation associée au chat, si applicable",
        required: false,
    }),
    __metadata("design:type", String)
], ChatResponseDto.prototype, "evaluationId", void 0);
//# sourceMappingURL=chat.response.dto.js.map