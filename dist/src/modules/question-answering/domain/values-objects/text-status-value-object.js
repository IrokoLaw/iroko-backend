"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceStatus = exports.StatusEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["ROVOKED"] = "ABROGE";
    StatusEnum["APPLICABLE"] = "EN VIGUEUR";
    StatusEnum["UPDATED"] = "MODIFIE(EN VIGUEUR)";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
class SourceStatus extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(StatusEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException(' the status  is invalid');
        }
    }
}
exports.SourceStatus = SourceStatus;
//# sourceMappingURL=text-status-value-object.js.map