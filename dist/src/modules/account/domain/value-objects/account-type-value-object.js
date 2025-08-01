"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountType = exports.AccountTypeEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var AccountTypeEnum;
(function (AccountTypeEnum) {
    AccountTypeEnum["SOLO"] = "SOLO";
    AccountTypeEnum["ENTERPRISE"] = "ENTERPRISE";
})(AccountTypeEnum || (exports.AccountTypeEnum = AccountTypeEnum = {}));
class AccountType extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(AccountTypeEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Account type is invalid');
        }
    }
}
exports.AccountType = AccountType;
//# sourceMappingURL=account-type-value-object.js.map