"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionMapper = exports.discussionSchema = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const discussion_entity_1 = require("../domain/entities/discussion/discussion.entity");
const discussion_response_dto_1 = require("../dtos/discussion.response.dto");
const discussion_entity_db_1 = require("../infrastructure/persistance/discussion.entity.db");
exports.discussionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string(),
    userId: zod_1.z.string(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
});
let DiscussionMapper = class DiscussionMapper {
    toDomain(dbEntity) {
        const { id, title, userId, createdAt, updatedAt } = dbEntity;
        return new discussion_entity_1.DiscussionEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                title,
                userId,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            title: copy.title,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            userId: copy.userId,
        };
        exports.discussionSchema.parse(record);
        const dbEntity = new discussion_entity_db_1.DiscussionDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        const response = new discussion_response_dto_1.DiscussionResponseDto(props);
        return response;
    }
};
exports.DiscussionMapper = DiscussionMapper;
exports.DiscussionMapper = DiscussionMapper = __decorate([
    (0, common_1.Injectable)()
], DiscussionMapper);
//# sourceMappingURL=discussion.mapper.js.map