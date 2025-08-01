import { TransactionCurrencyEnum } from '../../value-objects/transaction-currency-value-object';
import { TransactionMethodEnum } from '../../value-objects/transaction-method-value-object';
import { TransactionStatusEnum } from '../../value-objects/transaction-status-value-object';
export interface TransactionProps {
    amount: number;
    currency: TransactionCurrencyEnum;
    country: string;
    status: TransactionStatusEnum;
    cardId: string;
    operationId: string;
    method: TransactionMethodEnum;
    date: Date;
}
export interface CreateTransactionProps {
    amount: number;
    currency: TransactionCurrencyEnum;
    country: string;
    operationId: string;
    method: TransactionMethodEnum;
    cardId: string;
}
