import { RoleEnum } from '../../value-objects/userAccountAssociation-role-value-object';

export interface UserAccountAssociationProps {
  userId: string;
  accountId: string;
  role: RoleEnum;
}

export interface CreateUserAccountAssociationProps {
  role: RoleEnum;
  userId: string;
  accountId: string;
}
