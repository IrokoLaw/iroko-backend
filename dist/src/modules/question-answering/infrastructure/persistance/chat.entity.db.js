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
exports.ChatDbEntity = void 0;
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const typeorm_1 = require("typeorm");
const chat_document_type_value_object_1 = require("../../domain/values-objects/chat-document-type-value-object");
const source_entity_db_1 = require("./source.entity.db");
const chat_legal_subject_value_object_1 = require("../../domain/values-objects/chat-legal-subject-value-object");
const discussion_entity_db_1 = require("./discussion.entity.db");
let ChatDbEntity = class ChatDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.ChatDbEntity = ChatDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], ChatDbEntity.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], ChatDbEntity.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: chat_document_type_value_object_1.DocumentTypeEnum, array: true, nullable: true }),
    __metadata("design:type", Array)
], ChatDbEntity.prototype, "documentTypes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: chat_legal_subject_value_object_1.LegalSubjectEnum, array: true, nullable: true }),
    __metadata("design:type", Array)
], ChatDbEntity.prototype, "legalSubjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => source_entity_db_1.SourceDbEntity, (source) => source.chat, { cascade: true }),
    __metadata("design:type", Array)
], ChatDbEntity.prototype, "sources", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => discussion_entity_db_1.DiscussionDbEntity, (discussion) => discussion.chats, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "discussionId" }),
    __metadata("design:type", discussion_entity_db_1.DiscussionDbEntity)
], ChatDbEntity.prototype, "discussion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatDbEntity.prototype, "discussionId", void 0);
exports.ChatDbEntity = ChatDbEntity = __decorate([
    (0, typeorm_1.Entity)("chats")
], ChatDbEntity);
//# sourceMappingURL=chat.entity.db.js.map