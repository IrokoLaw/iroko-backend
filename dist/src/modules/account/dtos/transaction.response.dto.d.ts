import { ResponseBase } from '@/libs/api/response.base';
import { TransactionCurrencyEnum } from '../domain/value-objects/transaction-currency-value-object';
import { TransactionStatusEnum } from '../domain/value-objects/transaction-status-value-object';
import { TransactionMethodEnum } from '../domain/value-objects/transaction-method-value-object';
export declare class TransactionResponseDto extends ResponseBase {
    amount: number;
    currency: TransactionCurrencyEnum;
    country: string;
    status: TransactionStatusEnum;
    cardId: string;
    operationId: string;
    method: TransactionMethodEnum;
    date: string;
}
