"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatus = exports.AccountStatusEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var AccountStatusEnum;
(function (AccountStatusEnum) {
    AccountStatusEnum["ACTIVATED"] = "ACTIVATED";
    AccountStatusEnum["INACTIVATED"] = "INACTIVATED";
    AccountStatusEnum["PENDING_PAYMENT"] = "PENDING_PAYMENT";
    AccountStatusEnum["ARCHIVED"] = "ARCHIVED";
})(AccountStatusEnum || (exports.AccountStatusEnum = AccountStatusEnum = {}));
class AccountStatus extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(AccountStatusEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Account status is invalid');
        }
    }
}
exports.AccountStatus = AccountStatus;
//# sourceMappingURL=account-status-value-object.js.map