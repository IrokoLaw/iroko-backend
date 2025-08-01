import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum InvoicingTypeEnum {
    'MONTHLY' = "MONTHLY",
    'ANNUAL' = "ANNUAL",
    'TRY' = "TRY"
}
export declare class InvoicingType extends ValueObject<InvoicingTypeEnum> {
    constructor(props: {
        value: InvoicingTypeEnum;
    });
    protected validate(props: {
        value: InvoicingTypeEnum;
    }): void;
}
