import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum CardStatusEnum {
    'ACTIVATED' = "ACTIVATED",
    'EXPIRED' = "EXPIRED",
    'SUSPENDED' = "SUSPENDED"
}
export declare class CardStatus extends ValueObject<CardStatusEnum> {
    constructor(props: {
        value: CardStatusEnum;
    });
    protected validate(props: {
        value: CardStatusEnum;
    }): void;
}
