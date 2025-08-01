"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceAction = exports.ActionEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var ActionEnum;
(function (ActionEnum) {
    ActionEnum["PRECISION"] = "PRECISION";
    ActionEnum["MODIFICATION"] = "MODIFICATION";
    ActionEnum["APPLICATION"] = "MISE EN APPLICATION";
    ActionEnum["RAS"] = "RAS";
})(ActionEnum || (exports.ActionEnum = ActionEnum = {}));
class SourceAction extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(ActionEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException(' the action  is invalid');
        }
    }
}
exports.SourceAction = SourceAction;
//# sourceMappingURL=text-action-object-value.js.map