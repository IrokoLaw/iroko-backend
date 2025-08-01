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
exports.CardDbEntity = void 0;
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const typeorm_1 = require("typeorm");
const brand_value_object_1 = require("../../domain/value-objects/brand-value-object");
const user_entity_db_1 = require("./user.entity.db");
const card_status_value_object_1 = require("../../domain/value-objects/card-status-value-object");
const transaction_entity_db_1 = require("./transaction.entity.db");
let CardDbEntity = class CardDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.CardDbEntity = CardDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: brand_value_object_1.BrandEnum, default: brand_value_object_1.BrandEnum.VISA }),
    __metadata("design:type", String)
], CardDbEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], CardDbEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4, unique: true }),
    __metadata("design:type", String)
], CardDbEntity.prototype, "numberLast4", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CardDbEntity.prototype, "expMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], CardDbEntity.prototype, "expYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], CardDbEntity.prototype, "holderName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: card_status_value_object_1.CardStatusEnum,
        default: card_status_value_object_1.CardStatusEnum.ACTIVATED,
    }),
    __metadata("design:type", String)
], CardDbEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], CardDbEntity.prototype, "isPrincipal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CardDbEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_db_1.UserDbEntity, (user) => user.cards),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_db_1.UserDbEntity)
], CardDbEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_db_1.TransactionDbEntity, (transaction) => transaction.card),
    __metadata("design:type", Array)
], CardDbEntity.prototype, "transactions", void 0);
exports.CardDbEntity = CardDbEntity = __decorate([
    (0, typeorm_1.Entity)('cards')
], CardDbEntity);
//# sourceMappingURL=card.entity.db.js.map