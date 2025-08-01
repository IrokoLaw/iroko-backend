import { BaseEntityProps } from '@/libs/domain/entity.base';
import { DocumentTypeEnum } from '../../values-objects/chat-document-type-value-object';
import { LegalSubjectEnum } from '../../values-objects/chat-legal-subject-value-object';

export interface ChatProps {
  question: string;
  answer: string;
  documentTypes?: DocumentTypeEnum[];
  legalSubjects?: LegalSubjectEnum[];
  discussionId: string;
  evaluationId?: string;
}

export interface CreateChatProps {
  question: string;
  answer: string;
  documentTypes?: DocumentTypeEnum[];
  legalSubjects?: LegalSubjectEnum[];
  discussionId: string;
}

export interface ChatEntityProps extends ChatProps, BaseEntityProps {}
