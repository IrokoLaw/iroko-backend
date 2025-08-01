import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { TransactionCurrencyEnum } from '../../domain/value-objects/transaction-currency-value-object';
import { TransactionStatusEnum } from '../../domain/value-objects/transaction-status-value-object';
import { CardDbEntity } from './card.entity.db';
import { TransactionMethodEnum } from '../../domain/value-objects/transaction-method-value-object';
export declare class TransactionDbEntity extends BaseEntityDb {
    amount: number;
    currency: TransactionCurrencyEnum;
    country: string;
    status: TransactionStatusEnum;
    cardId: string;
    card: CardDbEntity;
    operationId: string;
    method: TransactionMethodEnum;
    date: Date;
}
