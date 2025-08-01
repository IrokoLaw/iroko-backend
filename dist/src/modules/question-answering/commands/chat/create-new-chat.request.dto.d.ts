import { LegalSubjectEnum } from '../../domain/values-objects/chat-legal-subject-value-object';
import { DocumentTypeEnum } from '../../domain/values-objects/chat-document-type-value-object';
export declare class CreateNewChatRequestDto {
    question: string;
    legalSubjects?: LegalSubjectEnum[];
    documentTypes?: DocumentTypeEnum[];
}
export declare class UpdateChatRequestDto extends CreateNewChatRequestDto {
}
