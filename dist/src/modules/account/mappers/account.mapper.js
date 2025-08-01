"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMapper = exports.accountSchema = void 0;
const account_type_value_object_1 = require("../domain/value-objects/account-type-value-object");
const invoicing_type_value_object_1 = require("../domain/value-objects/invoicing-type-value-object");
const account_status_value_object_1 = require("../domain/value-objects/account-status-value-object");
const common_1 = require("@nestjs/common");
const account_entity_1 = require("../domain/entities/account/account.entity");
const zod_1 = require("zod");
const account_response_dto_1 = require("../dtos/account.response.dto");
const account_entity_db_1 = require("../infrastructure/persistance/account.entity.db");
exports.accountSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    type: zod_1.z.nativeEnum(account_type_value_object_1.AccountTypeEnum),
    invoicingType: zod_1.z.nativeEnum(invoicing_type_value_object_1.InvoicingTypeEnum),
    expirePaymentDate: zod_1.z.preprocess((val) => (val instanceof Date ? val : new Date(val)), zod_1.z.date()),
    capacity: zod_1.z.number().min(1).max(100),
    status: zod_1.z.nativeEnum(account_status_value_object_1.AccountStatusEnum),
});
let AccountMapper = class AccountMapper {
    toDomain(dbEntity) {
        const { id, type, invoicingType, expirePaymentDate, capacity, status } = dbEntity;
        return new account_entity_1.AccountEntity({
            id,
            createdAt: new Date(dbEntity.createdAt),
            updatedAt: new Date(dbEntity.updatedAt),
            props: {
                type,
                invoicingType,
                expirePaymentDate,
                capacity,
                status,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            type: copy.type,
            invoicingType: copy.invoicingType,
            expirePaymentDate: copy.expirePaymentDate,
            capacity: copy.capacity,
            status: copy.status,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
        };
        exports.accountSchema.parse(record);
        const dbEntity = new account_entity_db_1.AccountDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        return new account_response_dto_1.AccountResponseDto(props);
    }
};
exports.AccountMapper = AccountMapper;
exports.AccountMapper = AccountMapper = __decorate([
    (0, common_1.Injectable)()
], AccountMapper);
//# sourceMappingURL=account.mapper.js.map