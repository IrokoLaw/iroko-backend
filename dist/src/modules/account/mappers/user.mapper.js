"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = exports.userSchema = void 0;
const user_entity_1 = require("../domain/entities/user/user.entity");
const user_response_dto_1 = require("../dtos/user.response.dto");
const user_entity_db_1 = require("../infrastructure/persistance/user.entity.db");
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const user_role_value_object_1 = require("../domain/value-objects/user-role-value-object");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    createdAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    updatedAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    firstName: zod_1.z.string().min(2).max(150),
    lastName: zod_1.z.string().min(2).max(50),
    email: zod_1.z.string().email(),
    externalUserId: zod_1.z.string().min(1).max(150),
    UserRole: zod_1.z.nativeEnum(user_role_value_object_1.UserRoleEnum),
});
let UserMapper = class UserMapper {
    toDomain(dbEntity) {
        const { id, firstName, lastName, email, externalUserId, userRole, createdAt, updatedAt, } = dbEntity;
        return new user_entity_1.UserEntity({
            id,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
            props: {
                firstName,
                lastName,
                email,
                externalUserId,
                userRole,
            },
        });
    }
    toPersistence(domainEntity) {
        const copy = domainEntity.getProps();
        const record = {
            id: copy.id,
            firstName: copy.firstName,
            lastName: copy.lastName,
            email: copy.email,
            externalUserId: copy.externalUserId,
            UserRole: copy.userRole,
            createdAt: copy.createdAt,
            updatedAt: copy.updatedAt,
        };
        exports.userSchema.parse(record);
        const dbEntity = new user_entity_db_1.UserDbEntity();
        Object.assign(dbEntity, record);
        return dbEntity;
    }
    toResponse(domainEntity) {
        const props = domainEntity.getProps();
        const response = new user_response_dto_1.UserResponseDto(props);
        return response;
    }
};
exports.UserMapper = UserMapper;
exports.UserMapper = UserMapper = __decorate([
    (0, common_1.Injectable)()
], UserMapper);
//# sourceMappingURL=user.mapper.js.map