import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoleEnum } from '../domain/value-objects/user-role-value-object';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'Jean',
    description: "User's first name",
  })
  @MaxLength(150)
  @MinLength(2)
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Kouadio',
    description: "User's last name",
  })
  @MaxLength(50)
  @MinLength(2)
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: 'jean.kouadio@gmail.com',
    description: "User's email address",
  })
  @MaxLength(50)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'ghad6567575GVGFCYTS676gdqh667',
    description: 'IAM user id',
  })
  @MaxLength(150)
  @MinLength(1)
  @IsString()
  readonly externalUserId: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'User role',
    enum: UserRoleEnum,
  })
  @IsEnum(UserRoleEnum)
  readonly userRole: UserRoleEnum;
}
