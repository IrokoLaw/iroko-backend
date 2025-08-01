import { BaseEntityDb } from '@/libs/db/base-entity-db';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DocumentTypeEnum } from '../../domain/values-objects/chat-document-type-value-object';
import { SourceDbEntity } from './source.entity.db';
import { DiscussionDbEntity } from './discussion.entity.db';
import { EvaluationDbEntity } from './evaluation.entity.db';
import { LegalSubjectEnum } from '../../domain/values-objects/chat-legal-subject-value-object';

@Entity('chats')
export class ChatDbEntity extends BaseEntityDb {
  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'text', nullable: false })
  answer: string;

  @Column({ type: 'enum', enum: DocumentTypeEnum, array: true, nullable: true })
  documentTypes?: DocumentTypeEnum[];

  @Column({ type: 'enum', enum: LegalSubjectEnum, array: true, nullable: true })
  legalSubjects?: LegalSubjectEnum[];

  @OneToMany(() => SourceDbEntity, (source) => source.chat, { cascade: true })
  sources: SourceDbEntity[];

  @ManyToOne(() => DiscussionDbEntity, (discussion) => discussion.chats)
  @JoinColumn({ name: 'discussionId' })
  discussion: DiscussionDbEntity;

  @Column()
  discussionId: string;

  @OneToOne(() => EvaluationDbEntity, (evaluation) => evaluation.chat)
  @JoinColumn({ name: 'evaluationId' })
  evaluation?: EvaluationDbEntity;

  @Column({ nullable: true })
  evaluationId?: string;
}
