import { ResponseBase } from '@/libs/api/response.base';
import { RoleEnum } from '../domain/value-objects/userAccountAssociation-role-value-object';
export declare class UserAccountAssociationResponseDto extends ResponseBase {
    userId: string;
    accountId: string;
    role: RoleEnum;
}
