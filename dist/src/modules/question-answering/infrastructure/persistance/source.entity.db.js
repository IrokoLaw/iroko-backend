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
exports.SourceDbEntity = void 0;
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const typeorm_1 = require("typeorm");
const text_status_value_object_1 = require("../../domain/values-objects/text-status-value-object");
const text_action_object_value_1 = require("../../domain/values-objects/text-action-object-value");
const chat_entity_db_1 = require("./chat.entity.db");
const source_bloc_value_object_1 = require("../../domain/values-objects/source-bloc-value-object");
const legal_text_type_value_object_1 = require("../../domain/values-objects/legal-text-type-value-object");
let SourceDbEntity = class SourceDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.SourceDbEntity = SourceDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "legalTextName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: source_bloc_value_object_1.BlocEnum, nullable: true }),
    __metadata("design:type", Object)
], SourceDbEntity.prototype, "bloc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: text_status_value_object_1.StatusEnum, nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: legal_text_type_value_object_1.LegalTextTypeEnum, nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "legalTextType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: text_action_object_value_1.ActionEnum, nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "titleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "chapterNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "sectionNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "articleNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "pathDoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "pathMetadata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => chat_entity_db_1.ChatDbEntity, (chat) => chat.sources),
    (0, typeorm_1.JoinColumn)({ name: "chatId" }),
    __metadata("design:type", chat_entity_db_1.ChatDbEntity)
], SourceDbEntity.prototype, "chat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true, default: "" }),
    __metadata("design:type", String)
], SourceDbEntity.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: false, default: 1 }),
    __metadata("design:type", Number)
], SourceDbEntity.prototype, "page", void 0);
exports.SourceDbEntity = SourceDbEntity = __decorate([
    (0, typeorm_1.Entity)("source")
], SourceDbEntity);
//# sourceMappingURL=source.entity.db.js.map