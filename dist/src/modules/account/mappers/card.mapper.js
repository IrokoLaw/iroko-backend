"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMapper = exports.cardSchema = void 0;
const zod_1 = require("zod");
const brand_value_object_1 = require("../domain/value-objects/brand-value-object");
const card_status_value_object_1 = require("../domain/value-objects/card-status-value-object");
const common_1 = require("@nestjs/common");
const card_entity_1 = require("../domain/entities/card/card.entity");
const card_response_dto_1 = require("../dtos/card.response.dto");
const card_entity_db_1 = require("../infrastructure/persistance/card.entity.db");
exports.cardSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    brand: zod_1.z.nativeEnum(brand_value_object_1.BrandEnum),
    token: zod_1.z.string(),
    expMonth: zod_1.z.number(),
    expYear: zod_1.z.number(),
    holderName: zod_1.z.string(),
    status: zod_1.z.nativeEnum(card_status_value_object_1.CardStatusEnum),
    userId: zod_1.z.string(),
    numberLast4: zod_1.z.string(),
});
let CardMapper = class CardMapper {
    toDomain(dbEntity) {
        const { id, brand, token, expMonth, expYear, holderName, status, isPrincipal, createdAt, updatedAt, numberLast4, userId, } = dbEntity;
        return new card_entity_1.CardEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                brand,
                token,
                expMonth,
                expYear,
                holderName,
                status,
                isPrincipal,
                userId,
                numberLast4,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            brand: copy.brand,
            token: copy.token,
            expYear: copy.expYear,
            expMonth: copy.expMonth,
            holderName: copy.holderName,
            status: copy.status,
            numberLast4: copy.numberLast4,
            userId: copy.userId,
        };
        exports.cardSchema.parse(record);
        const dbEntity = new card_entity_db_1.CardDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        const response = new card_response_dto_1.CardResponseDto(props);
        return response;
    }
};
exports.CardMapper = CardMapper;
exports.CardMapper = CardMapper = __decorate([
    (0, common_1.Injectable)()
], CardMapper);
//# sourceMappingURL=card.mapper.js.map