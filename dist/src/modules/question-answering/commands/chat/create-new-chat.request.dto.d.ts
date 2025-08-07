import { LegalSubjectEnum } from "../../domain/values-objects/chat-legal-subject-value-object";
import { DocumentTypeEnum } from "../../domain/values-objects/chat-document-type-value-object";
import { LLMQuestionAnsweringSource } from "../../infrastructure/llm-question-answering/llm-question-answering.type";
export declare class CreateNewChatRequestDto {
    question: string;
    legalSubjects?: LegalSubjectEnum[];
    answer: string;
    documents: LLMQuestionAnsweringSource[];
    documentTypes?: DocumentTypeEnum[];
}
export declare class UpdateChatRequestDto extends CreateNewChatRequestDto {
}
