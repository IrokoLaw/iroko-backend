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
exports.AccountDbEntity = void 0;
const account_status_value_object_1 = require("../../domain/value-objects/account-status-value-object");
const account_type_value_object_1 = require("../../domain/value-objects/account-type-value-object");
const invoicing_type_value_object_1 = require("../../domain/value-objects/invoicing-type-value-object");
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const typeorm_1 = require("typeorm");
const user_account_association_entity_db_1 = require("./user-account-association.entity.db");
let AccountDbEntity = class AccountDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.AccountDbEntity = AccountDbEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: account_type_value_object_1.AccountTypeEnum,
        default: account_type_value_object_1.AccountTypeEnum.SOLO,
    }),
    __metadata("design:type", String)
], AccountDbEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: invoicing_type_value_object_1.InvoicingTypeEnum,
        default: invoicing_type_value_object_1.InvoicingTypeEnum.TRY,
    }),
    __metadata("design:type", String)
], AccountDbEntity.prototype, "invoicingType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], AccountDbEntity.prototype, "expirePaymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], AccountDbEntity.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: account_status_value_object_1.AccountStatusEnum,
        default: account_status_value_object_1.AccountStatusEnum.ACTIVATED,
    }),
    __metadata("design:type", String)
], AccountDbEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_account_association_entity_db_1.UserAccountAssociationDbEntity, (assoc) => assoc.account),
    __metadata("design:type", Array)
], AccountDbEntity.prototype, "userAssociations", void 0);
exports.AccountDbEntity = AccountDbEntity = __decorate([
    (0, typeorm_1.Entity)('accounts')
], AccountDbEntity);
//# sourceMappingURL=account.entity.db.js.map