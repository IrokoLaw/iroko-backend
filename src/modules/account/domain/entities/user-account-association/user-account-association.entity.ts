import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import {
  CreateUserAccountAssociationProps,
  UserAccountAssociationProps,
} from './user-account-association.type';
import { randomUUID } from 'crypto';
import { UserAccountAssociationRole } from '../../value-objects/userAccountAssociation-role-value-object';

export class UserAccountAssociationEntity extends BaseEntity<UserAccountAssociationProps> {
  protected readonly _id: AggregateID;

  static create(
    data: CreateUserAccountAssociationProps,
  ): UserAccountAssociationEntity {
    const id = randomUUID();
    const role = new UserAccountAssociationRole({ value: data.role });

    return new UserAccountAssociationEntity({
      id,
      props: {
        ...data,
        role: role.unpack(),
      },
    });
  }

  public validate() {}
}
