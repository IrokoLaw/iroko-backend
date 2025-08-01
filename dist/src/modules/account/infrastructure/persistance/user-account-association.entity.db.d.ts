import { UserDbEntity } from './user.entity.db';
import { AccountDbEntity } from './account.entity.db';
import { RoleEnum } from '../../domain/value-objects/userAccountAssociation-role-value-object';
import { BaseEntityDb } from '@/libs/db/base-entity-db';
export declare class UserAccountAssociationDbEntity extends BaseEntityDb {
    userId: string;
    accountId: string;
    role: RoleEnum;
    user: UserDbEntity;
    account: AccountDbEntity;
}
