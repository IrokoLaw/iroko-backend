import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@/libs/api/response.base';
import { RoleEnum } from '../domain/value-objects/userAccountAssociation-role-value-object';

export class UserAccountAssociationResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'user_12345',
    description: 'ID of the user associated with the account',
  })
  userId: string;

  @ApiProperty({
    example: 'account_67890',
    description: 'ID of the account associated with the user',
  })
  accountId: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Role of the user in the association',
    enum: RoleEnum,
  })
  role: RoleEnum;
}
