import { AccountStatusEnum } from '../../value-objects/account-status-value-object';
import { AccountTypeEnum } from '../../value-objects/account-type-value-object';
import { InvoicingTypeEnum } from '../../value-objects/invoicing-type-value-object';
export interface AccountProps {
    type: AccountTypeEnum;
    invoicingType: InvoicingTypeEnum;
    expirePaymentDate: Date;
    capacity: number;
    status: AccountStatusEnum;
}
export interface CreateAccountProps {
    type: AccountTypeEnum;
    invoicingType: InvoicingTypeEnum;
    capacity: number;
}
