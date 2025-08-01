import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from '@/libs/api/response.base';
import { DiscussionEntityProps } from '../domain/entities/discussion/discussion.type';
export class DiscussionResponseDto extends ResponseBase {
  constructor(props: DiscussionEntityProps) {
    super(props);
    this.title = props.title;
    this.userId = props.userId;
  }

  @ApiProperty({
    example: 'Discussion sur la réglementation bancaire',
    description: 'Titre de la discussion',
  })
  title: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: "ID de l'utilisateur ayant initié la discussion",
  })
  userId: string;
}
