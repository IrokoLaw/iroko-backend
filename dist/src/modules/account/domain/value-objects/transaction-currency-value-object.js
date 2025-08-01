"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCurrency = exports.TransactionCurrencyEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var TransactionCurrencyEnum;
(function (TransactionCurrencyEnum) {
    TransactionCurrencyEnum["XOF"] = "XOF";
    TransactionCurrencyEnum["XAF"] = "XAF";
})(TransactionCurrencyEnum || (exports.TransactionCurrencyEnum = TransactionCurrencyEnum = {}));
class TransactionCurrency extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(TransactionCurrencyEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Transaction method is invalid');
        }
    }
}
exports.TransactionCurrency = TransactionCurrency;
//# sourceMappingURL=transaction-currency-value-object.js.map