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
exports.AccountResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const account_type_value_object_1 = require("../domain/value-objects/account-type-value-object");
const invoicing_type_value_object_1 = require("../domain/value-objects/invoicing-type-value-object");
const account_status_value_object_1 = require("../domain/value-objects/account-status-value-object");
const response_base_1 = require("../../../libs/api/response.base");
class AccountResponseDto extends response_base_1.ResponseBase {
}
exports.AccountResponseDto = AccountResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SOLO',
        description: 'Account type',
    }),
    __metadata("design:type", account_type_value_object_1.AccountType)
], AccountResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'MONTHLY',
        description: 'Invoicing type',
    }),
    __metadata("design:type", invoicing_type_value_object_1.InvoicingType)
], AccountResponseDto.prototype, "invoicingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-01-01T00:00:00.000Z',
        description: 'Expire payment date',
    }),
    __metadata("design:type", Date)
], AccountResponseDto.prototype, "expirePaymentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'Capacity',
    }),
    __metadata("design:type", Number)
], AccountResponseDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ACTIVATED',
        description: 'Account status',
    }),
    __metadata("design:type", account_status_value_object_1.AccountStatus)
], AccountResponseDto.prototype, "status", void 0);
//# sourceMappingURL=account.response.dto.js.map