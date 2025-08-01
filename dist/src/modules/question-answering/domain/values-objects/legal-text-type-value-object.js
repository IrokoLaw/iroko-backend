"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalTextType = exports.LegalTextTypeEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var LegalTextTypeEnum;
(function (LegalTextTypeEnum) {
    LegalTextTypeEnum["LOI"] = "LOI";
    LegalTextTypeEnum["ORDONNANCE"] = "ORDONNANCE";
    LegalTextTypeEnum["DECRET"] = "DECRET";
    LegalTextTypeEnum["ARRETE"] = "ARRETE";
    LegalTextTypeEnum["JURISPRUDENCE"] = "JURISPRUDENCE";
    LegalTextTypeEnum["TRAITE_OHADA"] = "TRAITE OHADA";
    LegalTextTypeEnum["DOCTRINE"] = "DOCTRINE";
})(LegalTextTypeEnum || (exports.LegalTextTypeEnum = LegalTextTypeEnum = {}));
class LegalTextType extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (props.value !== undefined &&
            !Object.values(LegalTextTypeEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('The legal text type is invalid');
        }
    }
}
exports.LegalTextType = LegalTextType;
//# sourceMappingURL=legal-text-type-value-object.js.map