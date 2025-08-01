import { CreateTransactionProps, TransactionProps } from './transaction.type';
import { randomUUID } from 'crypto';
import {
  TransactionStatus,
  TransactionStatusEnum,
} from '../../value-objects/transaction-status-value-object';
import { TransactionMethod } from '../../value-objects/transaction-method-value-object';
import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { TransactionCurrency } from '../../value-objects/transaction-currency-value-object';

export class TransactionEntity extends BaseEntity<TransactionProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateTransactionProps): TransactionEntity {
    const id = randomUUID();
    const status = new TransactionStatus({
      value: TransactionStatusEnum.SUCCESS,
    });
    const method = new TransactionMethod({ value: data.method });
    const currency = new TransactionCurrency({ value: data.currency });
    const cardId = null;
    const now = new Date();
    const transaction = new TransactionEntity({
      id,
      props: {
        ...data,
        status: status.unpack(),
        method: method.unpack(),
        currency: currency.unpack(),
        cardId,
        date: now,
      },
    });
    return transaction;
  }

  public validate() {
    if (this.props.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
  }
}
