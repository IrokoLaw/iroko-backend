import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum UserRoleEnum {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
  'SUPER_ADMIN' = 'SUPER_ADMIN',
}

export class UserRole extends ValueObject<UserRoleEnum> {
  constructor(props: { value: UserRoleEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: UserRoleEnum }): void {
    if (!Object.values(UserRoleEnum).includes(props.value)) {
      throw new ArgumentInvalidException('User role  is invalid');
    }
  }
}
