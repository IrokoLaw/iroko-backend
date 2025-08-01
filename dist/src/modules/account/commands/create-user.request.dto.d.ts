import { UserRoleEnum } from '../domain/value-objects/user-role-value-object';
export declare class CreateUserRequestDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly externalUserId: string;
    readonly userRole: UserRoleEnum;
}
