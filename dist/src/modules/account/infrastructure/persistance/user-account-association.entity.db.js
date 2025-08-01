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
exports.UserAccountAssociationDbEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_db_1 = require("./user.entity.db");
const account_entity_db_1 = require("./account.entity.db");
const userAccountAssociation_role_value_object_1 = require("../../domain/value-objects/userAccountAssociation-role-value-object");
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
let UserAccountAssociationDbEntity = class UserAccountAssociationDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.UserAccountAssociationDbEntity = UserAccountAssociationDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserAccountAssociationDbEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserAccountAssociationDbEntity.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: userAccountAssociation_role_value_object_1.RoleEnum }),
    __metadata("design:type", String)
], UserAccountAssociationDbEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_db_1.UserDbEntity, (user) => user.accountAssociations),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_db_1.UserDbEntity)
], UserAccountAssociationDbEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_db_1.AccountDbEntity, (account) => account.userAssociations),
    (0, typeorm_1.JoinColumn)({ name: 'accountId' }),
    __metadata("design:type", account_entity_db_1.AccountDbEntity)
], UserAccountAssociationDbEntity.prototype, "account", void 0);
exports.UserAccountAssociationDbEntity = UserAccountAssociationDbEntity = __decorate([
    (0, typeorm_1.Entity)('user_account_associations')
], UserAccountAssociationDbEntity);
//# sourceMappingURL=user-account-association.entity.db.js.map