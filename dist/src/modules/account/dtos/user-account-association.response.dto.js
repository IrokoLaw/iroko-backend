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
exports.UserAccountAssociationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_base_1 = require("../../../libs/api/response.base");
const userAccountAssociation_role_value_object_1 = require("../domain/value-objects/userAccountAssociation-role-value-object");
class UserAccountAssociationResponseDto extends response_base_1.ResponseBase {
}
exports.UserAccountAssociationResponseDto = UserAccountAssociationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user_12345',
        description: 'ID of the user associated with the account',
    }),
    __metadata("design:type", String)
], UserAccountAssociationResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'account_67890',
        description: 'ID of the account associated with the user',
    }),
    __metadata("design:type", String)
], UserAccountAssociationResponseDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ADMIN',
        description: 'Role of the user in the association',
        enum: userAccountAssociation_role_value_object_1.RoleEnum,
    }),
    __metadata("design:type", String)
], UserAccountAssociationResponseDto.prototype, "role", void 0);
//# sourceMappingURL=user-account-association.response.dto.js.map