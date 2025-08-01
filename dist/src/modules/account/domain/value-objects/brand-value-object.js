"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = exports.BrandEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var BrandEnum;
(function (BrandEnum) {
    BrandEnum["VISA"] = "VISA";
    BrandEnum["MASTERCARD"] = "MASTERCARD";
})(BrandEnum || (exports.BrandEnum = BrandEnum = {}));
class Brand extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(BrandEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Brand is invalid');
        }
    }
}
exports.Brand = Brand;
//# sourceMappingURL=brand-value-object.js.map