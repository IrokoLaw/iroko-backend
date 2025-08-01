import { AccountStatusEnum } from '@/modules/account/domain/value-objects/account-status-value-object';
import { AccountTypeEnum } from '@/modules/account/domain/value-objects/account-type-value-object';
import { InvoicingTypeEnum } from '@/modules/account/domain/value-objects/invoicing-type-value-object';
import { BaseEntityDb } from '@libs/db/base-entity-db';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserAccountAssociationDbEntity } from './user-account-association.entity.db';

@Entity('accounts')
export class AccountDbEntity extends BaseEntityDb {
  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    default: AccountTypeEnum.SOLO,
  })
  type: AccountTypeEnum;

  @Column({
    type: 'enum',
    enum: InvoicingTypeEnum,
    default: InvoicingTypeEnum.TRY,
  })
  invoicingType: InvoicingTypeEnum;

  @Column({
    type: 'timestamptz',
  })
  expirePaymentDate: Date;

  @Column({
    type: 'int',
  })
  capacity: number;

  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.ACTIVATED,
  })
  status: AccountStatusEnum;

  @OneToMany(() => UserAccountAssociationDbEntity, (assoc) => assoc.account)
  userAssociations: UserAccountAssociationDbEntity[];
}
