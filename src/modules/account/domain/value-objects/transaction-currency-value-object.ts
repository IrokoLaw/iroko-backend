import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum TransactionCurrencyEnum {
  'XOF' = 'XOF',
  'XAF' = 'XAF',
}

export class TransactionCurrency extends ValueObject<TransactionCurrencyEnum> {
  constructor(props: { value: TransactionCurrencyEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: TransactionCurrencyEnum }): void {
    if (!Object.values(TransactionCurrencyEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Transaction method is invalid');
    }
  }
}
