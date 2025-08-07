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
exports.EvaluationDbEntity = void 0;
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const evaluation_note_value_object_1 = require("../../domain/values-objects/evaluation-note-value-object");
const typeorm_1 = require("typeorm");
let EvaluationDbEntity = class EvaluationDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.EvaluationDbEntity = EvaluationDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: evaluation_note_value_object_1.EvaluationNoteEnum, nullable: false }),
    __metadata("design:type", String)
], EvaluationDbEntity.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true, default: "" }),
    __metadata("design:type", String)
], EvaluationDbEntity.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: false }),
    __metadata("design:type", String)
], EvaluationDbEntity.prototype, "chatId", void 0);
exports.EvaluationDbEntity = EvaluationDbEntity = __decorate([
    (0, typeorm_1.Entity)("evaluation")
], EvaluationDbEntity);
//# sourceMappingURL=evaluation.entity.db.js.map