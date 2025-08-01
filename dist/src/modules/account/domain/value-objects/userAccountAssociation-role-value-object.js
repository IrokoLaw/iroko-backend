"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountAssociationRole = exports.RoleEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["MEMBER"] = "MEMBER";
    RoleEnum["OWNER"] = "OWNER";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
class UserAccountAssociationRole extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(RoleEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('userAccountAssociation is invalid');
        }
    }
}
exports.UserAccountAssociationRole = UserAccountAssociationRole;
//# sourceMappingURL=userAccountAssociation-role-value-object.js.map