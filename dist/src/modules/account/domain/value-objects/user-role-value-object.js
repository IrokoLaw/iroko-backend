"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.UserRoleEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["USER"] = "USER";
    UserRoleEnum["ADMIN"] = "ADMIN";
    UserRoleEnum["SUPER_ADMIN"] = "SUPER_ADMIN";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
class UserRole extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(UserRoleEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('User role  is invalid');
        }
    }
}
exports.UserRole = UserRole;
//# sourceMappingURL=user-role-value-object.js.map