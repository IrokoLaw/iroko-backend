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
exports.TransactionDbEntity = void 0;
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const typeorm_1 = require("typeorm");
const transaction_currency_value_object_1 = require("../../domain/value-objects/transaction-currency-value-object");
const transaction_status_value_object_1 = require("../../domain/value-objects/transaction-status-value-object");
const card_entity_db_1 = require("./card.entity.db");
const transaction_method_value_object_1 = require("../../domain/value-objects/transaction-method-value-object");
let TransactionDbEntity = class TransactionDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.TransactionDbEntity = TransactionDbEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], TransactionDbEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: transaction_currency_value_object_1.TransactionCurrencyEnum,
    }),
    __metadata("design:type", String)
], TransactionDbEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 4,
    }),
    __metadata("design:type", String)
], TransactionDbEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: transaction_status_value_object_1.TransactionStatusEnum }),
    __metadata("design:type", String)
], TransactionDbEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TransactionDbEntity.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => card_entity_db_1.CardDbEntity, (card) => card.transactions),
    (0, typeorm_1.JoinColumn)({ name: 'cardId' }),
    __metadata("design:type", card_entity_db_1.CardDbEntity)
], TransactionDbEntity.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, unique: true }),
    __metadata("design:type", String)
], TransactionDbEntity.prototype, "operationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: transaction_method_value_object_1.TransactionMethodEnum }),
    __metadata("design:type", String)
], TransactionDbEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], TransactionDbEntity.prototype, "date", void 0);
exports.TransactionDbEntity = TransactionDbEntity = __decorate([
    (0, typeorm_1.Entity)('transactions')
], TransactionDbEntity);
//# sourceMappingURL=transaction.entity.db.js.map