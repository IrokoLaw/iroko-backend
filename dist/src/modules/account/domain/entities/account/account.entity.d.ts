import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateAccountProps, AccountProps } from './account.types';
import { InvoicingTypeEnum } from '../../value-objects/invoicing-type-value-object';
export declare class AccountEntity extends BaseEntity<AccountProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateAccountProps): AccountEntity;
    private changeStatus;
    makeInactive(): void;
    makeActive(): void;
    makePendingPayment(): void;
    makeArchived(): void;
    private changeType;
    makeEnterprise(capacity?: number): void;
    updateCapacity(capacity: number): void;
    updateExpirePaymentDate(invType: InvoicingTypeEnum): void;
    static calculateExpirationDate(invType: InvoicingTypeEnum): Date;
    makeSolo(): void;
    private validateAccountType;
    validate(): void;
}
