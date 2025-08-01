"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMethod = exports.TransactionMethodEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var TransactionMethodEnum;
(function (TransactionMethodEnum) {
    TransactionMethodEnum["CARD"] = "CARD";
    TransactionMethodEnum["MTN"] = "MTN";
    TransactionMethodEnum["MOOV"] = "MOOV";
    TransactionMethodEnum["ORANGE"] = "ORANGE";
    TransactionMethodEnum["WAVE"] = "WAVE";
})(TransactionMethodEnum || (exports.TransactionMethodEnum = TransactionMethodEnum = {}));
class TransactionMethod extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(TransactionMethodEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Transaction method is invalid');
        }
    }
}
exports.TransactionMethod = TransactionMethod;
//# sourceMappingURL=transaction-method-value-object.js.map