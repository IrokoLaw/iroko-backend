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
exports.TransactionResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const response_base_1 = require("../../../libs/api/response.base");
const transaction_currency_value_object_1 = require("../domain/value-objects/transaction-currency-value-object");
const transaction_status_value_object_1 = require("../domain/value-objects/transaction-status-value-object");
const transaction_method_value_object_1 = require("../domain/value-objects/transaction-method-value-object");
class TransactionResponseDto extends response_base_1.ResponseBase {
}
exports.TransactionResponseDto = TransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100.5,
        description: 'Transaction amount',
    }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'XOF',
        description: 'Transaction currency',
        enum: transaction_currency_value_object_1.TransactionCurrencyEnum,
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'US',
        description: 'Country where the transaction was made',
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SUCCESS',
        description: 'Transaction Status',
        enum: transaction_status_value_object_1.TransactionStatusEnum,
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'card_12345abcdef',
        description: 'ID of the card used for the transaction',
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "cardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'op_67890xyz',
        description: 'Transaction ID related to the transaction',
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "operationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ONLINE_PAYMENT',
        description: 'Method used for the transaction',
        enum: transaction_method_value_object_1.TransactionMethodEnum,
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-02-17T12:34:56.789Z',
        description: 'Date and time of transaction',
    }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "date", void 0);
//# sourceMappingURL=transaction.response.dto.js.map