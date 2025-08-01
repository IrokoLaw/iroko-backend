import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum RoleEnum {
  'MEMBER' = 'MEMBER',
  'OWNER' = 'OWNER',
}

export class UserAccountAssociationRole extends ValueObject<RoleEnum> {
  constructor(props: { value: RoleEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: RoleEnum }): void {
    if (!Object.values(RoleEnum).includes(props.value)) {
      throw new ArgumentInvalidException('userAccountAssociation is invalid');
    }
  }
}
