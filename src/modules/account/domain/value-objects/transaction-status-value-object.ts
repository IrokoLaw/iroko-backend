import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum TransactionStatusEnum {
  'SUCCESS' = 'SUCCESS',
  'FAILED' = 'FAILED',
}

export class TransactionStatus extends ValueObject<TransactionStatusEnum> {
  constructor(props: { value: TransactionStatusEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: TransactionStatusEnum }): void {
    if (!Object.values(TransactionStatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Transaction status is invalid');
    }
  }
}
