import { CardProps, CreateCardProps } from './card.type';
import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CardStatusEnum } from '../../value-objects/card-status-value-object';
export declare class CardEntity extends BaseEntity<CardProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateCardProps): CardEntity;
    changeCardStatus(status: CardStatusEnum): void;
    updateExpYear(expYear: number): void;
    makeExpire(): void;
    switchPrincipal(): void;
    validate(): void;
}
