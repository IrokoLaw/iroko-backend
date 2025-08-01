import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
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
    description: 'password of a user',
  })
  @MaxLength(150)
  @MinLength(8)
  @IsString()
  readonly password: string;
}
