import { ValueObject } from '@libs/domain/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

export enum AccountStatusEnum {
  'ACTIVATED' = 'ACTIVATED',
  'INACTIVATED' = 'INACTIVATED',
  'PENDING_PAYMENT' = 'PENDING_PAYMENT',
  'ARCHIVED' = 'ARCHIVED',
}

export class AccountStatus extends ValueObject<AccountStatusEnum> {
  constructor(props: { value: AccountStatusEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: AccountStatusEnum }): void {
    if (!Object.values(AccountStatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Account status is invalid');
    }
  }
}
