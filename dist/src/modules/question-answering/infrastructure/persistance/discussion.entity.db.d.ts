import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { UserDbEntity } from '@/modules/account/infrastructure/persistance/user.entity.db';
import { ChatDbEntity } from './chat.entity.db';
export declare class DiscussionDbEntity extends BaseEntityDb {
    title: string;
    chats?: ChatDbEntity[];
    user: UserDbEntity;
    userId: string;
}
