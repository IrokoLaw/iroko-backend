import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum UserRoleEnum {
    'USER' = "USER",
    'ADMIN' = "ADMIN",
    'SUPER_ADMIN' = "SUPER_ADMIN"
}
export declare class UserRole extends ValueObject<UserRoleEnum> {
    constructor(props: {
        value: UserRoleEnum;
    });
    protected validate(props: {
        value: UserRoleEnum;
    }): void;
}
