import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum TransactionMethodEnum {
  'CARD' = 'CARD',
  'MTN' = 'MTN',
  'MOOV' = 'MOOV',
  'ORANGE' = 'ORANGE',
  'WAVE' = 'WAVE',
}

export class TransactionMethod extends ValueObject<TransactionMethodEnum> {
  constructor(props: { value: TransactionMethodEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: TransactionMethodEnum }): void {
    if (!Object.values(TransactionMethodEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Transaction method is invalid');
    }
  }
}
