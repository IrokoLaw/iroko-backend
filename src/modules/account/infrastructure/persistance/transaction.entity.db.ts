import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransactionCurrencyEnum } from '../../domain/value-objects/transaction-currency-value-object';
import { TransactionStatusEnum } from '../../domain/value-objects/transaction-status-value-object';
import { CardDbEntity } from './card.entity.db';
import { TransactionMethodEnum } from '../../domain/value-objects/transaction-method-value-object';

@Entity('transactions')
export class TransactionDbEntity extends BaseEntityDb {
  @Column({
    type: 'int',
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionCurrencyEnum,
  })
  currency: TransactionCurrencyEnum;

  @Column({
    type: 'varchar',
    length: 4,
  })
  country: string;

  @Column({ type: 'enum', enum: TransactionStatusEnum })
  status: TransactionStatusEnum;

  @Column()
  cardId: string;

  @ManyToOne(() => CardDbEntity, (card) => card.transactions)
  @JoinColumn({ name: 'cardId' })
  card: CardDbEntity;

  @Column({ type: 'varchar', length: 150, unique: true })
  operationId: string;

  @Column({ type: 'enum', enum: TransactionMethodEnum })
  method: TransactionMethodEnum;

  @Column({ type: 'timestamptz' })
  date: Date;
}
