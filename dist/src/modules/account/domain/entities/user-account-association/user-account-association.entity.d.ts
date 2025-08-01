import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateUserAccountAssociationProps, UserAccountAssociationProps } from './user-account-association.type';
export declare class UserAccountAssociationEntity extends BaseEntity<UserAccountAssociationProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateUserAccountAssociationProps): UserAccountAssociationEntity;
    validate(): void;
}
