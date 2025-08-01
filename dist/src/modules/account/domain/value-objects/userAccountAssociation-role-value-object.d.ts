import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum RoleEnum {
    'MEMBER' = "MEMBER",
    'OWNER' = "OWNER"
}
export declare class UserAccountAssociationRole extends ValueObject<RoleEnum> {
    constructor(props: {
        value: RoleEnum;
    });
    protected validate(props: {
        value: RoleEnum;
    }): void;
}
