import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BrandEnum } from '../../domain/value-objects/brand-value-object';
import { UserDbEntity } from './user.entity.db';
import { CardStatusEnum } from '../../domain/value-objects/card-status-value-object';
import { TransactionDbEntity } from './transaction.entity.db';

@Entity('cards')
export class CardDbEntity extends BaseEntityDb {
  @Column({ type: 'enum', enum: BrandEnum, default: BrandEnum.VISA })
  brand: BrandEnum;

  @Column({ type: 'varchar', unique: true })
  token: string;

  @Column({ type: 'varchar', length: 4, unique: true })
  numberLast4: string;

  @Column({ type: 'int' })
  expMonth: number;

  @Column({ type: 'int' })
  expYear: number;

  @Column({ type: 'varchar' })
  holderName: string;

  @Column({
    type: 'enum',
    enum: CardStatusEnum,
    default: CardStatusEnum.ACTIVATED,
  })
  status: CardStatusEnum;

  @Column({ type: 'boolean' })
  isPrincipal: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => UserDbEntity, (user) => user.cards)
  @JoinColumn({ name: 'userId' })
  user: UserDbEntity;

  @OneToMany(() => TransactionDbEntity, (transaction) => transaction.card)
  transactions: TransactionDbEntity[];
}
