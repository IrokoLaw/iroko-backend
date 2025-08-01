"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEntity = void 0;
const crypto_1 = require("crypto");
const transaction_status_value_object_1 = require("../../value-objects/transaction-status-value-object");
const transaction_method_value_object_1 = require("../../value-objects/transaction-method-value-object");
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const transaction_currency_value_object_1 = require("../../value-objects/transaction-currency-value-object");
class TransactionEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const status = new transaction_status_value_object_1.TransactionStatus({
            value: transaction_status_value_object_1.TransactionStatusEnum.SUCCESS,
        });
        const method = new transaction_method_value_object_1.TransactionMethod({ value: data.method });
        const currency = new transaction_currency_value_object_1.TransactionCurrency({ value: data.currency });
        const cardId = null;
        const now = new Date();
        const transaction = new TransactionEntity({
            id,
            props: {
                ...data,
                status: status.unpack(),
                method: method.unpack(),
                currency: currency.unpack(),
                cardId,
                date: now,
            },
        });
        return transaction;
    }
    validate() {
        if (this.props.amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }
    }
}
exports.TransactionEntity = TransactionEntity;
//# sourceMappingURL=transaction.entity.js.map