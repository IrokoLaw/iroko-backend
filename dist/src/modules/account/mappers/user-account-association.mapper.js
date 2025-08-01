"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountAssociationMapper = exports.userAccountAssociationSchema = void 0;
const common_1 = require("@nestjs/common");
const user_account_association_response_dto_1 = require("../dtos/user-account-association.response.dto");
const userAccountAssociation_role_value_object_1 = require("../domain/value-objects/userAccountAssociation-role-value-object");
const zod_1 = require("zod");
const user_account_association_entity_db_1 = require("../infrastructure/persistance/user-account-association.entity.db");
const user_account_association_entity_1 = require("../domain/entities/user-account-association/user-account-association.entity");
exports.userAccountAssociationSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    userId: zod_1.z.string(),
    accountId: zod_1.z.string(),
    role: zod_1.z.nativeEnum(userAccountAssociation_role_value_object_1.RoleEnum),
    dateAjout: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
});
let UserAccountAssociationMapper = class UserAccountAssociationMapper {
    toDomain(dbEntity) {
        const { id, userId, accountId, role, createdAt, updatedAt } = dbEntity;
        return new user_account_association_entity_1.UserAccountAssociationEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                accountId,
                userId,
                role,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            accountId: copy.accountId,
            userId: copy.userId,
            role: copy.role,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
        };
        exports.userAccountAssociationSchema.parse(record);
        const dbEntity = new user_account_association_entity_db_1.UserAccountAssociationDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        return new user_account_association_response_dto_1.UserAccountAssociationResponseDto(props);
    }
};
exports.UserAccountAssociationMapper = UserAccountAssociationMapper;
exports.UserAccountAssociationMapper = UserAccountAssociationMapper = __decorate([
    (0, common_1.Injectable)()
], UserAccountAssociationMapper);
//# sourceMappingURL=user-account-association.mapper.js.map