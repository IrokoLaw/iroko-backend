import { ValueObject } from '@libs/domain/value-object.base';
export declare enum AccountStatusEnum {
    'ACTIVATED' = "ACTIVATED",
    'INACTIVATED' = "INACTIVATED",
    'PENDING_PAYMENT' = "PENDING_PAYMENT",
    'ARCHIVED' = "ARCHIVED"
}
export declare class AccountStatus extends ValueObject<AccountStatusEnum> {
    constructor(props: {
        value: AccountStatusEnum;
    });
    protected validate(props: {
        value: AccountStatusEnum;
    }): void;
}
