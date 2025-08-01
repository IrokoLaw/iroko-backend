import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum CardStatusEnum {
  'ACTIVATED' = 'ACTIVATED',
  'EXPIRED' = 'EXPIRED',
  'SUSPENDED' = 'SUSPENDED',
}

export class CardStatus extends ValueObject<CardStatusEnum> {
  constructor(props: { value: CardStatusEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: CardStatusEnum }): void {
    if (!Object.values(CardStatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Card status is invalid');
    }
  }
}
