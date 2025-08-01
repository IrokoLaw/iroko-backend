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
exports.CreateUserRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_role_value_object_1 = require("../domain/value-objects/user-role-value-object");
class CreateUserRequestDto {
}
exports.CreateUserRequestDto = CreateUserRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Jean',
        description: "User's first name",
    }),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kouadio',
        description: "User's last name",
    }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'jean.kouadio@gmail.com',
        description: "User's email address",
    }),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ghad6567575GVGFCYTS676gdqh667',
        description: 'IAM user id',
    }),
    (0, class_validator_1.MaxLength)(150),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserRequestDto.prototype, "externalUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ADMIN',
        description: 'User role',
        enum: user_role_value_object_1.UserRoleEnum,
    }),
    (0, class_validator_1.IsEnum)(user_role_value_object_1.UserRoleEnum),
    __metadata("design:type", String)
], CreateUserRequestDto.prototype, "userRole", void 0);
//# sourceMappingURL=create-user.request.dto.js.map