"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationMapper = exports.evaluationSchema = void 0;
const zod_1 = require("zod");
const evaluation_note_value_object_1 = require("../domain/values-objects/evaluation-note-value-object");
const common_1 = require("@nestjs/common");
const evaluation_entity_1 = require("../domain/entities/evaluation/evaluation.entity");
const evaluation_response_dto_1 = require("../dtos/evaluation.response.dto");
const evaluation_entity_db_1 = require("../infrastructure/persistance/evaluation.entity.db");
exports.evaluationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    note: zod_1.z.nativeEnum(evaluation_note_value_object_1.EvaluationNoteEnum),
    comment: zod_1.z.string(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
});
let EvaluationMapper = class EvaluationMapper {
    toDomain(dbEntity) {
        const { id, createdAt, updatedAt, note, comment, chatId } = dbEntity;
        return new evaluation_entity_1.EvaluationEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                note,
                comment,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            note: copy.note,
            comment: copy.comment,
        };
        exports.evaluationSchema.parse(record);
        const dbEntity = new evaluation_entity_db_1.EvaluationDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        const response = new evaluation_response_dto_1.EvaluationResponseDto(props);
        return response;
    }
};
exports.EvaluationMapper = EvaluationMapper;
exports.EvaluationMapper = EvaluationMapper = __decorate([
    (0, common_1.Injectable)()
], EvaluationMapper);
//# sourceMappingURL=evaluation.mapper.js.map