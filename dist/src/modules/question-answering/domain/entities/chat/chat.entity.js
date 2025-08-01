"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEntity = void 0;
const entity_base_1 = require("../../../../../libs/domain/entity.base");
const crypto_1 = require("crypto");
const chat_document_type_value_object_1 = require("../../values-objects/chat-document-type-value-object");
const chat_legal_subject_value_object_1 = require("../../values-objects/chat-legal-subject-value-object");
class ChatEntity extends entity_base_1.BaseEntity {
    static create(data) {
        const id = (0, crypto_1.randomUUID)();
        const documentType = data.documentTypes
            ? data.documentTypes.map((dt) => new chat_document_type_value_object_1.ChatDocumentType({ value: dt }))
            : [];
        const legalSubject = data.legalSubjects
            ? data.legalSubjects.map((ls) => new chat_legal_subject_value_object_1.ChatLegalSubject({ value: ls }))
            : [];
        const documentTypeEnums = documentType.map((v) => v.unpack());
        const legalSubjectEnums = legalSubject.map((v) => v.unpack());
        const chat = new ChatEntity({
            id,
            props: {
                ...data,
                documentTypes: documentTypeEnums,
                legalSubjects: legalSubjectEnums,
            },
        });
        return chat;
    }
    associateEvaluation(evaluationId) {
        this.props.evaluationId = evaluationId;
    }
    validate() { }
}
exports.ChatEntity = ChatEntity;
//# sourceMappingURL=chat.entity.js.map