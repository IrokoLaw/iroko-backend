import { UserRoleEnum } from '../../domain/value-objects/user-role-value-object';
import { CardDbEntity } from './card.entity.db';
import { UserAccountAssociationDbEntity } from './user-account-association.entity.db';
import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { DiscussionDbEntity } from '@/modules/question-answering/infrastructure/persistance/discussion.entity.db';
export declare class UserDbEntity extends BaseEntityDb {
    firstName: string;
    lastName: string;
    email: string;
    externalUserId: string;
    userRole: UserRoleEnum;
    cards: CardDbEntity[];
    accountAssociations: UserAccountAssociationDbEntity[];
    discussions?: DiscussionDbEntity[];
}
