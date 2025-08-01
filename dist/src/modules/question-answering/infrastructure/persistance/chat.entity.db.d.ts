import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { DocumentTypeEnum } from '../../domain/values-objects/chat-document-type-value-object';
import { SourceDbEntity } from './source.entity.db';
import { DiscussionDbEntity } from './discussion.entity.db';
import { EvaluationDbEntity } from './evaluation.entity.db';
import { LegalSubjectEnum } from '../../domain/values-objects/chat-legal-subject-value-object';
export declare class ChatDbEntity extends BaseEntityDb {
    question: string;
    answer: string;
    documentTypes?: DocumentTypeEnum[];
    legalSubjects?: LegalSubjectEnum[];
    sources: SourceDbEntity[];
    discussion: DiscussionDbEntity;
    discussionId: string;
    evaluation?: EvaluationDbEntity;
    evaluationId?: string;
}
