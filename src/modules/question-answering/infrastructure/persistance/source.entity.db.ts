import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StatusEnum } from '../../domain/values-objects/text-status-value-object';
import { ActionEnum } from '../../domain/values-objects/text-action-object-value';
import { ChatDbEntity } from './chat.entity.db';
import { BlocEnum } from '../../domain/values-objects/source-bloc-value-object';
import { LegalTextTypeEnum } from '../../domain/values-objects/legal-text-type-value-object';

@Entity('source')
export class SourceDbEntity extends BaseEntityDb {
  @Column({ type: 'varchar', nullable: true })
  legalTextName?: string;

  @Column({ type: 'enum', enum: BlocEnum, nullable: true })
  bloc?: BlocEnum;

  @Column({ type: 'enum', enum: StatusEnum, nullable: true })
  status?: StatusEnum;

  @Column({ type: 'enum', enum: LegalTextTypeEnum, nullable: true })
  legalTextType?: LegalTextTypeEnum;

  @Column({ type: 'enum', enum: ActionEnum, nullable: true })
  action?: ActionEnum;

  @Column({ type: 'varchar', nullable: true })
  book?: string;

  @Column({ type: 'varchar', nullable: true })
  title?: string;

  @Column({ type: 'varchar', nullable: true })
  titleNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  chapter?: string;

  @Column({ type: 'varchar', nullable: true })
  chapterNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  section?: string;

  @Column({ type: 'varchar', nullable: true })
  sectionNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  articleNumber?: string;

  @Column({ type: 'varchar', nullable: true })
  pathDoc?: string;

  @Column({ type: 'varchar', nullable: true })
  pathMetadata?: string;

  @ManyToOne(() => ChatDbEntity, (chat) => chat.sources)
  @JoinColumn({ name: 'chatId' })
  chat: ChatDbEntity;

  @Column()
  chatId: string;
}
