import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateUserProps, UserProps } from './user.types';
export declare class UserEntity extends BaseEntity<UserProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateUserProps): UserEntity;
    validate(): void;
}
