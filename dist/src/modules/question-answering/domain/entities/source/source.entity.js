"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
const text_status_value_object_1 = require("../../values-objects/text-status-value-object");
const text_action_object_value_1 = require("../../values-objects/text-action-object-value");
const source_bloc_value_object_1 = require("../../values-objects/source-bloc-value-object");
const legal_text_type_value_object_1 = require("../../values-objects/legal-text-type-value-object");
class SourceEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const status = new text_status_value_object_1.SourceStatus({ value: data.status });
        const action = new text_action_object_value_1.SourceAction({ value: data.action });
        const bloc = new source_bloc_value_object_1.SourceBloc({ value: data.bloc });
        const legalTextType = new legal_text_type_value_object_1.LegalTextType({
            value: data.legalTextType,
        });
        const source = new SourceEntity({
            id,
            props: {
                ...data,
                status: status.unpack(),
                action: action.unpack(),
                bloc: bloc.unpack(),
                legalTextType: legalTextType.unpack(),
            },
        });
        return source;
    }
    validate() { }
}
exports.SourceEntity = SourceEntity;
//# sourceMappingURL=source.entity.js.map