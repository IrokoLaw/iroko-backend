import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum TransactionMethodEnum {
    'CARD' = "CARD",
    'MTN' = "MTN",
    'MOOV' = "MOOV",
    'ORANGE' = "ORANGE",
    'WAVE' = "WAVE"
}
export declare class TransactionMethod extends ValueObject<TransactionMethodEnum> {
    constructor(props: {
        value: TransactionMethodEnum;
    });
    protected validate(props: {
        value: TransactionMethodEnum;
    }): void;
}
