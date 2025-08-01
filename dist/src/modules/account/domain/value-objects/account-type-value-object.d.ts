import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum AccountTypeEnum {
    'SOLO' = "SOLO",
    'ENTERPRISE' = "ENTERPRISE"
}
export declare class AccountType extends ValueObject<AccountTypeEnum> {
    constructor(props: {
        value: AccountTypeEnum;
    });
    protected validate(props: {
        value: AccountTypeEnum;
    }): void;
}
