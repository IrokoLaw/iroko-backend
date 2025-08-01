import { AccountStatusEnum } from '@/modules/account/domain/value-objects/account-status-value-object';
import { AccountTypeEnum } from '@/modules/account/domain/value-objects/account-type-value-object';
import { InvoicingTypeEnum } from '@/modules/account/domain/value-objects/invoicing-type-value-object';
import { BaseEntityDb } from '@libs/db/base-entity-db';
import { UserAccountAssociationDbEntity } from './user-account-association.entity.db';
export declare class AccountDbEntity extends BaseEntityDb {
    type: AccountTypeEnum;
    invoicingType: InvoicingTypeEnum;
    expirePaymentDate: Date;
    capacity: number;
    status: AccountStatusEnum;
    userAssociations: UserAccountAssociationDbEntity[];
}
