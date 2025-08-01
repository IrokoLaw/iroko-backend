import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { DiscussionEntity } from '../domain/entities/discussion/discussion.entity';
import { Mapper } from '@/libs/domain/mapper.interface';
import { DiscussionResponseDto } from '../dtos/discussion.response.dto';
import { DiscussionDbEntity } from '../infrastructure/persistance/discussion.entity.db';

export const discussionSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  userId: z.string(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type DiscussionModel = z.TypeOf<typeof discussionSchema>;

@Injectable()
export class DiscussionMapper
  implements Mapper<DiscussionEntity, DiscussionModel, DiscussionResponseDto>
{
  toDomain(dbEntity: DiscussionDbEntity): DiscussionEntity {
    const { id, title, userId, createdAt, updatedAt } = dbEntity;

    return new DiscussionEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        title,
        userId,
      },
    });
  }

  toPersistence(domainEntity: DiscussionEntity): DiscussionDbEntity {
    const copy = domainEntity.getProps();

    const record: DiscussionModel = {
      id: copy.id,
      title: copy.title,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      userId: copy.userId,
    };

    discussionSchema.parse(record);
    const dbEntity = new DiscussionDbEntity();
    Object.assign(dbEntity, record);

    return dbEntity;
  }

  toResponse(domainEntity: DiscussionEntity): DiscussionResponseDto {
    const props = domainEntity.getProps();
    const response = new DiscussionResponseDto(props);
    return response;
  }
}
