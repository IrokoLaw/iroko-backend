import { CreateTransactionProps, TransactionProps } from './transaction.type';
import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
export declare class TransactionEntity extends BaseEntity<TransactionProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateTransactionProps): TransactionEntity;
    validate(): void;
}
