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
exports.CardResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_base_1 = require("../../../libs/api/response.base");
const brand_value_object_1 = require("../domain/value-objects/brand-value-object");
const card_status_value_object_1 = require("../domain/value-objects/card-status-value-object");
class CardResponseDto extends response_base_1.ResponseBase {
}
exports.CardResponseDto = CardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'VISA',
        description: 'Brand of the card',
    }),
    __metadata("design:type", String)
], CardResponseDto.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'tok_123456789',
        description: 'Unique token associated with the card',
    }),
    __metadata("design:type", String)
], CardResponseDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4242',
        description: 'Last 4 digits of the card number',
    }),
    __metadata("design:type", String)
], CardResponseDto.prototype, "numberLast4", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: 'Expiration month of the card',
    }),
    __metadata("design:type", Number)
], CardResponseDto.prototype, "expMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2025,
        description: 'Expiration year of the card',
    }),
    __metadata("design:type", Number)
], CardResponseDto.prototype, "expYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Name of the card holder',
    }),
    __metadata("design:type", String)
], CardResponseDto.prototype, "holderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACTIVATED',
        description: 'Status of the card',
    }),
    __metadata("design:type", String)
], CardResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Indicates if this is the principal card of the user',
    }),
    __metadata("design:type", Boolean)
], CardResponseDto.prototype, "isPrincipal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'user_12345',
        description: 'ID of the user who owns the card',
    }),
    __metadata("design:type", String)
], CardResponseDto.prototype, "userId", void 0);
//# sourceMappingURL=card.response.dto.js.map