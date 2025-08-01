"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMapper = exports.sourceSchema = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const source_entity_db_1 = require("../infrastructure/persistance/source.entity.db");
const source_response_dto_1 = require("../dtos/source.response.dto");
const source_bloc_value_object_1 = require("../domain/values-objects/source-bloc-value-object");
const text_action_object_value_1 = require("../domain/values-objects/text-action-object-value");
const text_status_value_object_1 = require("../domain/values-objects/text-status-value-object");
const source_entity_1 = require("../domain/entities/source/source.entity");
const legal_text_type_value_object_1 = require("../domain/values-objects/legal-text-type-value-object");
exports.sourceSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    legalTextName: zod_1.z.string().default(''),
    bloc: zod_1.z.nativeEnum(source_bloc_value_object_1.BlocEnum),
    status: zod_1.z.nativeEnum(text_status_value_object_1.StatusEnum),
    legalTextType: zod_1.z.nativeEnum(legal_text_type_value_object_1.LegalTextTypeEnum),
    action: zod_1.z.nativeEnum(text_action_object_value_1.ActionEnum),
    book: zod_1.z.string().optional().default(''),
    title: zod_1.z.string().optional().default(''),
    titleNumber: zod_1.z.string().optional().default(''),
    chapter: zod_1.z.string().optional().default(''),
    chapterNumber: zod_1.z.string().optional().default(''),
    section: zod_1.z.string().optional().default(''),
    sectionNumber: zod_1.z.string().optional().default(''),
    articleNumber: zod_1.z.string().default(''),
    text: zod_1.z.string().default(''),
    pathDoc: zod_1.z.string().default(''),
    pathMetadata: zod_1.z.string().default(''),
    chatId: zod_1.z.string(),
});
let SourceMapper = class SourceMapper {
    toDomain(dbEntity) {
        const { id, createdAt, updatedAt, legalTextName, bloc, status, legalTextType, action, book, title, titleNumber, chapter, chapterNumber, section, sectionNumber, articleNumber, pathDoc, pathMetadata, chatId, } = dbEntity;
        return new source_entity_1.SourceEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                legalTextName,
                bloc,
                status,
                legalTextType,
                action,
                book,
                title,
                titleNumber,
                chapter,
                chapterNumber,
                section,
                sectionNumber,
                articleNumber,
                pathDoc,
                pathMetadata,
                chatId,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            legalTextName: copy.legalTextName ?? '',
            bloc: copy.bloc,
            status: copy.status,
            legalTextType: copy.legalTextType ?? legal_text_type_value_object_1.LegalTextTypeEnum.LOI,
            action: copy.action,
            book: copy.book ?? '',
            title: copy.title ?? '',
            titleNumber: copy.titleNumber ?? '',
            chapter: copy.chapter ?? '',
            chapterNumber: copy.chapterNumber ?? '',
            section: copy.section ?? '',
            sectionNumber: copy.sectionNumber ?? '',
            articleNumber: copy.articleNumber ?? '',
            pathDoc: copy.pathDoc ?? '',
            pathMetadata: copy.pathMetadata ?? '',
            chatId: copy.chatId,
        };
        exports.sourceSchema.parse(record);
        const dbEntity = new source_entity_db_1.SourceDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        const response = new source_response_dto_1.SourceResponseDto(props);
        return response;
    }
};
exports.SourceMapper = SourceMapper;
exports.SourceMapper = SourceMapper = __decorate([
    (0, common_1.Injectable)()
], SourceMapper);
//# sourceMappingURL=source.mapper.js.map