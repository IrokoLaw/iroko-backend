import { RoleEnum } from '../../value-objects/userAccountAssociation-role-value-object';
import { UserAccountAssociationEntity } from './user-account-association.entity';
import { CreateUserAccountAssociationProps } from './user-account-association.type';

describe('UserAccountAssociation', () => {
  let validUserAccountAssociationData: CreateUserAccountAssociationProps;

  beforeEach(() => {
    validUserAccountAssociationData = {
      userId: '12900',
      role: RoleEnum.OWNER,
      accountId: '098734',
    };
  });

  test('should create an card with valid data ', () => {
    const userAccountAssociation = UserAccountAssociationEntity.create(
      validUserAccountAssociationData,
    );
    expect(userAccountAssociation).toBeInstanceOf(UserAccountAssociationEntity);
  });
});
