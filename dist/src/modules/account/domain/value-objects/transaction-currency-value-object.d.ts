import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum TransactionCurrencyEnum {
    'XOF' = "XOF",
    'XAF' = "XAF"
}
export declare class TransactionCurrency extends ValueObject<TransactionCurrencyEnum> {
    constructor(props: {
        value: TransactionCurrencyEnum;
    });
    protected validate(props: {
        value: TransactionCurrencyEnum;
    }): void;
}
