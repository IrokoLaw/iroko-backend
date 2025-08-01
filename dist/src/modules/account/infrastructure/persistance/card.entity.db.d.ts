import { BaseEntityDb } from '@/libs/db/base-entity-db';
import { BrandEnum } from '../../domain/value-objects/brand-value-object';
import { UserDbEntity } from './user.entity.db';
import { CardStatusEnum } from '../../domain/value-objects/card-status-value-object';
import { TransactionDbEntity } from './transaction.entity.db';
export declare class CardDbEntity extends BaseEntityDb {
    brand: BrandEnum;
    token: string;
    numberLast4: string;
    expMonth: number;
    expYear: number;
    holderName: string;
    status: CardStatusEnum;
    isPrincipal: boolean;
    userId: string;
    user: UserDbEntity;
    transactions: TransactionDbEntity[];
}
