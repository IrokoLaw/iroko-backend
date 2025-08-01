import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoleEnum } from '../../domain/value-objects/user-role-value-object';
import { CardDbEntity } from './card.entity.db';
import { UserAccountAssociationDbEntity } from './user-account-association.entity.db';
import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { DiscussionDbEntity } from '@/modules/question-answering/infrastructure/persistance/discussion.entity.db';

@Entity('users')
export class UserDbEntity extends BaseEntityDb {
  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', unique: true })
  externalUserId: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  userRole: UserRoleEnum;

  @OneToMany(() => CardDbEntity, (card) => card.user)
  cards: CardDbEntity[];

  @OneToMany(() => UserAccountAssociationDbEntity, (assoc) => assoc.user)
  accountAssociations: UserAccountAssociationDbEntity[];

  @OneToMany(() => DiscussionDbEntity, (discussion) => discussion.user, {
    cascade: true,
  })
  discussions?: DiscussionDbEntity[];
}
