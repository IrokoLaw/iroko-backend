"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
const evaluation_note_value_object_1 = require("../../values-objects/evaluation-note-value-object");
class EvaluationEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const note = new evaluation_note_value_object_1.EvaluationNote({ value: data.note });
        const evaluation = new EvaluationEntity({
            id,
            props: {
                ...data,
                note: note.unpack(),
            },
        });
        return evaluation;
    }
    validate() { }
}
exports.EvaluationEntity = EvaluationEntity;
//# sourceMappingURL=evaluation.entity.js.map