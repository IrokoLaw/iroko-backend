import { z } from 'zod';
import { EvaluationNoteEnum } from '../domain/values-objects/evaluation-note-value-object';
import { Injectable } from '@nestjs/common';
import { EvaluationEntity } from '../domain/entities/evaluation/evaluation.entity';
import { EvaluationResponseDto } from '../dtos/evaluation.response.dto';
import { EvaluationDbEntity } from '../infrastructure/persistance/evaluation.entity.db';
import { Mapper } from '@/libs/domain/mapper.interface';

export const evaluationSchema = z.object({
  id: z.string().uuid(),
  note: z.nativeEnum(EvaluationNoteEnum),
  comment: z.string(),
  chatId: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type EvaluationModel = z.TypeOf<typeof evaluationSchema>;

@Injectable()
export class EvaluationMapper
  implements Mapper<EvaluationEntity, EvaluationModel, EvaluationResponseDto>
{
  toDomain(dbEntity: EvaluationDbEntity): EvaluationEntity {
    const { id, createdAt, updatedAt, note, comment, chatId } = dbEntity;

    return new EvaluationEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        note,
        comment,
        chatId,
      },
    });
  }

  toPersistence(domainEntity: EvaluationEntity): EvaluationDbEntity {
    const copy = domainEntity.getProps();
    const record: EvaluationModel = {
      id: copy.id,
      chatId: copy.chatId,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      note: copy.note,
      comment: copy.comment,
    };
    evaluationSchema.parse(record);
    const dbEntity = new EvaluationDbEntity();
    Object.assign(dbEntity, record);
    return dbEntity;
  }

  toResponse(domainEntity: EvaluationEntity): EvaluationResponseDto {
    const props = domainEntity.getProps();
    const response = new EvaluationResponseDto(props);
    return response;
  }
}
