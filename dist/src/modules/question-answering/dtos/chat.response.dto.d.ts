import { ResponseBase } from '@/libs/api/response.base';
import { DocumentTypeEnum } from '../domain/values-objects/chat-document-type-value-object';
import { LegalSubjectEnum } from '../domain/values-objects/chat-legal-subject-value-object';
import { ChatEntityProps } from '../domain/entities/chat/chat.type';
export declare class ChatResponseDto extends ResponseBase {
    constructor(props: ChatEntityProps);
    question: string;
    answer: string;
    documentTypes?: DocumentTypeEnum[];
    legalSubjects?: LegalSubjectEnum[];
    discussionId: string;
    evaluationId?: string;
}
