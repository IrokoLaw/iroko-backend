import { ApiProperty } from '@nestjs/swagger';
import { EvaluationNoteEnum } from '../../domain/values-objects/evaluation-note-value-object';
import { IsOptional, IsString } from 'class-validator';

export class CreateNewEvaluationRequestDto {
  @ApiProperty({
    example: EvaluationNoteEnum.SATISFIED,
    description: 'give a mark of a response',
  })
  @IsOptional()
  note: EvaluationNoteEnum;

  @ApiProperty({
    example: 'the answer is good',
    description: 'comment the mark',
    required: false,
  })
  @IsString()
  comment?: string;
}

export class UpdateEvaluationRequestDto extends CreateNewEvaluationRequestDto {}
