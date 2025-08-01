import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { randomUUID } from 'crypto';
import { Email } from '../../value-objects/email-value-object';
import { CreateUserProps, UserProps } from './user.types';
import { UserRole } from '../../value-objects/user-role-value-object';

export class UserEntity extends BaseEntity<UserProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateUserProps): UserEntity {
    const id = randomUUID();

    const email = new Email({ value: data.email });
    const userRole = new UserRole({ value: data.userRole });

    const user = new UserEntity({
      id,
      props: { ...data, email: email.unpack(), userRole: userRole.unpack() },
    });

    return user;
  }

  public validate() {}
}
