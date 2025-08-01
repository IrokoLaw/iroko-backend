"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDocumentType = exports.DocumentTypeEnum = void 0;
const value_object_base_1 = require("../../../../libs/domain/value-object.base");
const exceptions_1 = require("../../../../libs/exceptions");
var DocumentTypeEnum;
(function (DocumentTypeEnum) {
    DocumentTypeEnum["CONSTITUTION"] = "CONSTITUTION";
    DocumentTypeEnum["DECREES"] = "DECREES";
    DocumentTypeEnum["TREATIES"] = "TREATIES";
    DocumentTypeEnum["ORDERS"] = "ORDERS";
    DocumentTypeEnum["LAWS"] = "LAWS";
    DocumentTypeEnum["JURISPRUDENCE"] = "JURISPRUDENCE";
    DocumentTypeEnum["ORDINANCES"] = "ORDINANCES";
    DocumentTypeEnum["CIRCULARS"] = "CIRCULARS";
})(DocumentTypeEnum || (exports.DocumentTypeEnum = DocumentTypeEnum = {}));
class ChatDocumentType extends value_object_base_1.ValueObject {
    constructor(props) {
        super({ value: props.value });
        this.validate({ value: this.props.value });
    }
    validate(props) {
        if (props.value !== undefined &&
            !Object.values(DocumentTypeEnum).includes(props.value)) {
            throw new exceptions_1.ArgumentInvalidException('Document type is invalid');
        }
    }
}
exports.ChatDocumentType = ChatDocumentType;
//# sourceMappingURL=chat-document-type-value-object.js.map