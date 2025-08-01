"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionStatusEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var TransactionStatusEnum;
(function (TransactionStatusEnum) {
    TransactionStatusEnum["SUCCESS"] = "SUCCESS";
    TransactionStatusEnum["FAILED"] = "FAILED";
})(TransactionStatusEnum || (exports.TransactionStatusEnum = TransactionStatusEnum = {}));
class TransactionStatus extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(TransactionStatusEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Transaction status is invalid');
        }
    }
}
exports.TransactionStatus = TransactionStatus;
//# sourceMappingURL=transaction-status-value-object.js.map