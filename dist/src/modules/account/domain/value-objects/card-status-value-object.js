"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardStatus = exports.CardStatusEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var CardStatusEnum;
(function (CardStatusEnum) {
    CardStatusEnum["ACTIVATED"] = "ACTIVATED";
    CardStatusEnum["EXPIRED"] = "EXPIRED";
    CardStatusEnum["SUSPENDED"] = "SUSPENDED";
})(CardStatusEnum || (exports.CardStatusEnum = CardStatusEnum = {}));
class CardStatus extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(CardStatusEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Card status is invalid');
        }
    }
}
exports.CardStatus = CardStatus;
//# sourceMappingURL=card-status-value-object.js.map