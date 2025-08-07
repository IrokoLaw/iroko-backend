"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceBloc = exports.BlocEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var BlocEnum;
(function (BlocEnum) {
    BlocEnum["REGLEMENTAIRE"] = "REGLEMENTAIRE";
    BlocEnum["LEGISLATIVE"] = "LEGISLATIF";
    BlocEnum["COMMUNAUTAIRE"] = "COMMUNAUTAIRE";
    BlocEnum["ACTES"] = "ACTES";
    BlocEnum[BlocEnum["RAS"] = undefined] = "RAS";
    BlocEnum["EMPTY"] = "EMPTY";
    BlocEnum["VIDE"] = "";
})(BlocEnum || (exports.BlocEnum = BlocEnum = {}));
class SourceBloc extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(BlocEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException("bloc is invalid");
        }
    }
}
exports.SourceBloc = SourceBloc;
//# sourceMappingURL=source-bloc-value-object.js.map