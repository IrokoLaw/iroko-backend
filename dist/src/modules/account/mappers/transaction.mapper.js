"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMapper = exports.transactionSchema = void 0;
const common_1 = require("@nestjs/common");
const transaction_entity_1 = require("../domain/entities/transaction/transaction.entity");
const transaction_response_dto_1 = require("../dtos/transaction.response.dto");
const transaction_entity_db_1 = require("../infrastructure/persistance/transaction.entity.db");
const transaction_currency_value_object_1 = require("../domain/value-objects/transaction-currency-value-object");
const transaction_status_value_object_1 = require("../domain/value-objects/transaction-status-value-object");
const transaction_method_value_object_1 = require("../domain/value-objects/transaction-method-value-object");
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    amount: zod_1.z.number(),
    currency: zod_1.z.nativeEnum(transaction_currency_value_object_1.TransactionCurrencyEnum),
    country: zod_1.z.string(),
    status: zod_1.z.nativeEnum(transaction_status_value_object_1.TransactionStatusEnum),
    cardId: zod_1.z.string(),
    operationId: zod_1.z.string(),
    method: zod_1.z.nativeEnum(transaction_method_value_object_1.TransactionMethodEnum),
    date: zod_1.z.preprocess((val) => (val instanceof Date ? val : new Date(val)), zod_1.z.date()),
});
let TransactionMapper = class TransactionMapper {
    toDomain(dbEntity) {
        const { id, amount, currency, country, status, card, operationId, method, date, createdAt, updatedAt, } = dbEntity;
        return new transaction_entity_1.TransactionEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                amount,
                currency,
                country,
                status,
                cardId: card.id,
                operationId,
                method,
                date,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
            amount: copy.amount,
            currency: copy.currency,
            country: copy.country,
            status: copy.status,
            cardId: copy.cardId,
            operationId: copy.operationId,
            method: copy.method,
            date: copy.date,
        };
        exports.transactionSchema.parse(record);
        const dbEntity = new transaction_entity_db_1.TransactionDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        return new transaction_response_dto_1.TransactionResponseDto(props);
    }
};
exports.TransactionMapper = TransactionMapper;
exports.TransactionMapper = TransactionMapper = __decorate([
    (0, common_1.Injectable)()
], TransactionMapper);
//# sourceMappingURL=transaction.mapper.js.map