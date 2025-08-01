import { UserRoleEnum } from '../../value-objects/user-role-value-object';
export interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    externalUserId: string;
    userRole: UserRoleEnum;
}
export interface CreateUserProps {
    firstName: string;
    lastName: string;
    email: string;
    externalUserId: string;
    userRole: UserRoleEnum;
}
