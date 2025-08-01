import { ResponseBase } from '@/libs/api/response.base';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto extends ResponseBase {
  @ApiProperty({
    example: 'Jean',
    description: "User's first name",
  })
  firstName: string;

  @ApiProperty({
    example: 'Kouadio',
    description: "User's last name",
  })
  lastName: string;

  @ApiProperty({
    example: 'jean.kouadio@gmail.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 'edgghhgqhgqs456465bvzed565',
    description: 'External IAM Service User Id',
  })
  externalUserId: string;
}
