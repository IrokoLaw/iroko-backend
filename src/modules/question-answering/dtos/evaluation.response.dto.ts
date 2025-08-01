import { ResponseBase } from '@/libs/api/response.base';
import { ApiProperty } from '@nestjs/swagger';
import { EvaluationNoteEnum } from '../domain/values-objects/evaluation-note-value-object';
import { EvaluationEntityProps } from '../domain/entities/evaluation/evaluation.type';

export class EvaluationResponseDto extends ResponseBase {
  constructor(props: EvaluationEntityProps) {
    super(props);
    this.note = props.note;
    this.comment = props.comment;
    this.chatId = props.chatId;
  }

  @ApiProperty({
    example: EvaluationNoteEnum.USEFUL,
    description: 'give a mark of a response',
  })
  note: EvaluationNoteEnum;

  @ApiProperty({
    example: 'the answer is good',
    description: 'comment the mark',
  })
  comment?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'the chat id',
  })
  chatId: string;
}
