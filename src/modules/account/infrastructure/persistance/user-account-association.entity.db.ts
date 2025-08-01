import { Entity, ManyToOne, Column, JoinColumn } from 'typeorm';
import { UserDbEntity } from './user.entity.db';
import { AccountDbEntity } from './account.entity.db';
import { RoleEnum } from '../../domain/value-objects/userAccountAssociation-role-value-object';
import { BaseEntityDb } from '@/libs/db/base-entity-db';

@Entity('user_account_associations')
export class UserAccountAssociationDbEntity extends BaseEntityDb {
  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  accountId: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @ManyToOne(() => UserDbEntity, (user) => user.accountAssociations)
  @JoinColumn({ name: 'userId' })
  user: UserDbEntity;

  @ManyToOne(() => AccountDbEntity, (account) => account.userAssociations)
  @JoinColumn({ name: 'accountId' })
  account: AccountDbEntity;
}
