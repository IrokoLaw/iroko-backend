import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewDiscussionRequestDto {
  @ApiProperty({
    example: 'Discussion sur la loi sur le travail',
    description: 'The title of the discussion',
  })
  @MinLength(1)
  @IsString()
  title: string;
}

export class UpdateDiscussionRequestDto extends CreateNewDiscussionRequestDto {}
