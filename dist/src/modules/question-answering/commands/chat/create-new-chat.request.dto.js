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
exports.UpdateChatRequestDto = exports.CreateNewChatRequestDto = void 0;
const class_validator_1 = require("class-validator");
const chat_legal_subject_value_object_1 = require("../../domain/values-objects/chat-legal-subject-value-object");
const chat_document_type_value_object_1 = require("../../domain/values-objects/chat-document-type-value-object");
const swagger_1 = require("@nestjs/swagger");
class CreateNewChatRequestDto {
}
exports.CreateNewChatRequestDto = CreateNewChatRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "La loi sur le travail ?",
        description: "The question asked in the chat",
    }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewChatRequestDto.prototype, "question", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [chat_legal_subject_value_object_1.LegalSubjectEnum.DEFAULT_LAW, chat_legal_subject_value_object_1.LegalSubjectEnum.LABOR_LAW],
        description: "The legal subjects related to the question",
        enum: chat_legal_subject_value_object_1.LegalSubjectEnum,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(chat_legal_subject_value_object_1.LegalSubjectEnum, { each: true }),
    __metadata("design:type", Array)
], CreateNewChatRequestDto.prototype, "legalSubjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "La loi sur le travail ?",
        description: "The question asked in the chat",
    }),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNewChatRequestDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [],
        description: "The legal subjects related to the question",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateNewChatRequestDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [chat_document_type_value_object_1.DocumentTypeEnum.LAWS, chat_document_type_value_object_1.DocumentTypeEnum.DECREES],
        description: "The type of document associated with the answer",
        enum: chat_document_type_value_object_1.DocumentTypeEnum,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(chat_document_type_value_object_1.DocumentTypeEnum, { each: true }),
    __metadata("design:type", Array)
], CreateNewChatRequestDto.prototype, "documentTypes", void 0);
class UpdateChatRequestDto extends CreateNewChatRequestDto {
}
exports.UpdateChatRequestDto = UpdateChatRequestDto;
//# sourceMappingURL=create-new-chat.request.dto.js.map