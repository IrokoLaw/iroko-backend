import { SourceProps } from '../entities/source/source.type';
import { DocumentTypeEnum } from '../values-objects/chat-document-type-value-object';
import { LegalSubjectEnum } from '../values-objects/chat-legal-subject-value-object';
export interface GetAnswerWithSourcesProps {
    question: string;
    legalSubjects?: LegalSubjectEnum[];
    documentTypes?: DocumentTypeEnum[];
}
export interface LLMQuestionAnsweringPort {
    getAnswerWithSources(props: GetAnswerWithSourcesProps): Promise<{
        answer: string;
        documents: Omit<SourceProps, 'chatId'>[];
    }>;
}
