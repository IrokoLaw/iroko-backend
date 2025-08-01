import { AccountType } from '../domain/value-objects/account-type-value-object';
import { InvoicingType } from '../domain/value-objects/invoicing-type-value-object';
import { AccountStatus } from '../domain/value-objects/account-status-value-object';
import { ResponseBase } from '@/libs/api/response.base';
export declare class AccountResponseDto extends ResponseBase {
    type: AccountType;
    invoicingType: InvoicingType;
    expirePaymentDate: Date;
    capacity: number;
    status: AccountStatus;
}
