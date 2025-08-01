"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationNote = exports.EvaluationNoteEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var EvaluationNoteEnum;
(function (EvaluationNoteEnum) {
    EvaluationNoteEnum["BAD"] = "BAD";
    EvaluationNoteEnum["USEFUL"] = "USEFUL";
    EvaluationNoteEnum["GREAT"] = "GREAT";
    EvaluationNoteEnum["NOT_SATISFIED"] = "NOT_SATISFIED";
    EvaluationNoteEnum["SATISFIED"] = "SATISFIED";
})(EvaluationNoteEnum || (exports.EvaluationNoteEnum = EvaluationNoteEnum = {}));
class EvaluationNote extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (!Object.values(EvaluationNoteEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException(' Evaluation note is invalid');
        }
    }
}
exports.EvaluationNote = EvaluationNote;
//# sourceMappingURL=evaluation-note-value-object.js.map