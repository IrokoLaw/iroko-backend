import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum TransactionStatusEnum {
    'SUCCESS' = "SUCCESS",
    'FAILED' = "FAILED"
}
export declare class TransactionStatus extends ValueObject<TransactionStatusEnum> {
    constructor(props: {
        value: TransactionStatusEnum;
    });
    protected validate(props: {
        value: TransactionStatusEnum;
    }): void;
}
