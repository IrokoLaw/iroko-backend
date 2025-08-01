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
exports.UserDbEntity = void 0;
const typeorm_1 = require("typeorm");
const user_role_value_object_1 = require("../../domain/value-objects/user-role-value-object");
const card_entity_db_1 = require("./card.entity.db");
const user_account_association_entity_db_1 = require("./user-account-association.entity.db");
const base_entity_db_1 = require("../../../../libs/db/base-entity-db");
const discussion_entity_db_1 = require("../../../question-answering/infrastructure/persistance/discussion.entity.db");
let UserDbEntity = class UserDbEntity extends base_entity_db_1.BaseEntityDb {
};
exports.UserDbEntity = UserDbEntity;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserDbEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], UserDbEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'varchar' }),
    __metadata("design:type", String)
], UserDbEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], UserDbEntity.prototype, "externalUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: user_role_value_object_1.UserRoleEnum, default: user_role_value_object_1.UserRoleEnum.USER }),
    __metadata("design:type", String)
], UserDbEntity.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_entity_db_1.CardDbEntity, (card) => card.user),
    __metadata("design:type", Array)
], UserDbEntity.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_account_association_entity_db_1.UserAccountAssociationDbEntity, (assoc) => assoc.user),
    __metadata("design:type", Array)
], UserDbEntity.prototype, "accountAssociations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => discussion_entity_db_1.DiscussionDbEntity, (discussion) => discussion.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserDbEntity.prototype, "discussions", void 0);
exports.UserDbEntity = UserDbEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserDbEntity);
//# sourceMappingURL=user.entity.db.js.map