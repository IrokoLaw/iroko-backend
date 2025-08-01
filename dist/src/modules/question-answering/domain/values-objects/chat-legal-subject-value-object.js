"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLegalSubject = exports.LegalSubjectEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var LegalSubjectEnum;
(function (LegalSubjectEnum) {
    LegalSubjectEnum["LABOR_LAW"] = "labor_law";
    LegalSubjectEnum["DEFAULT_LAW"] = "all";
})(LegalSubjectEnum || (exports.LegalSubjectEnum = LegalSubjectEnum = {}));
class ChatLegalSubject extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (props.value !== undefined &&
            !Object.values(LegalSubjectEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('The matter is invalid');
        }
    }
}
exports.ChatLegalSubject = ChatLegalSubject;
//# sourceMappingURL=chat-legal-subject-value-object.js.map