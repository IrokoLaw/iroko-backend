"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicingType = exports.InvoicingTypeEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var InvoicingTypeEnum;
(function (InvoicingTypeEnum) {
    InvoicingTypeEnum["MONTHLY"] = "MONTHLY";
    InvoicingTypeEnum["ANNUAL"] = "ANNUAL";
    InvoicingTypeEnum["TRY"] = "TRY";
})(InvoicingTypeEnum || (exports.InvoicingTypeEnum = InvoicingTypeEnum = {}));
class InvoicingType extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(InvoicingTypeEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Invoicing type is invalid');
        }
    }
}
exports.InvoicingType = InvoicingType;
//# sourceMappingURL=invoicing-type-value-object.js.map