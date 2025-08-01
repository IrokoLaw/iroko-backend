import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum AccountTypeEnum {
  'SOLO' = 'SOLO',
  'ENTERPRISE' = 'ENTERPRISE',
}

export class AccountType extends ValueObject<AccountTypeEnum> {
  constructor(props: { value: AccountTypeEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: AccountTypeEnum }): void {
    if (!Object.values(AccountTypeEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Account type is invalid');
    }
  }
}
