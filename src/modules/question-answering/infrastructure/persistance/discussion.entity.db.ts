import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { UserDbEntity } from '@/modules/account/infrastructure/persistance/user.entity.db';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ChatDbEntity } from './chat.entity.db';

@Entity('discussion')
export class DiscussionDbEntity extends BaseEntityDb {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @OneToMany(() => ChatDbEntity, (chat) => chat.discussion, { cascade: true })
  chats?: ChatDbEntity[];

  @ManyToOne(() => UserDbEntity, (user) => user.discussions)
  @JoinColumn({ name: 'userId' })
  user: UserDbEntity;

  @Column()
  userId: string;
}
