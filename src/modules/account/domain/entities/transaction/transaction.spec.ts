import { TransactionCurrencyEnum } from '../../value-objects/transaction-currency-value-object';
import { TransactionMethodEnum } from '../../value-objects/transaction-method-value-object';
import { TransactionStatusEnum } from '../../value-objects/transaction-status-value-object';
import { TransactionEntity } from './transaction.entity';
import { CreateTransactionProps } from './transaction.type';

describe('TransactionEnty', () => {
  let validTransaction: CreateTransactionProps;

  beforeEach(() => {
    validTransaction = {
      amount: 5000,
      currency: TransactionCurrencyEnum.XOF,
      country: 'CI',
      operationId: '413657',
      method: TransactionMethodEnum.CARD,
      cardId: '76478',
    };
  });
  test('should create an transaction with valid data', () => {
    const transaction = TransactionEntity.create(validTransaction);
    expect(transaction).toBeInstanceOf(TransactionEntity);
    expect(transaction.getProps().status).toBe(TransactionStatusEnum.SUCCESS);
    expect(transaction.getProps().method).toBe(TransactionMethodEnum.CARD);
  });
});
