import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum BrandEnum {
    'VISA' = "VISA",
    'MASTERCARD' = "MASTERCARD"
}
export declare class Brand extends ValueObject<BrandEnum> {
    constructor(props: {
        value: BrandEnum;
    });
    protected validate(props: {
        value: BrandEnum;
    }): void;
}
