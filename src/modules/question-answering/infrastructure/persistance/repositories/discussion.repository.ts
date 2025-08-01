import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { DiscussionEntity } from '@/modules/question-answering/domain/entities/discussion/discussion.entity';
import { DiscussionDbEntity } from '../discussion.entity.db';
import { DiscussionRepositoryPort } from '../../../domain/ports/discussion.repository.port';
import { DiscussionMapper } from '@/modules/question-answering/mapper/discussion.mapper';

@Injectable()
export class DiscussionRepository
  extends RepositoryBase<DiscussionEntity, DiscussionDbEntity>
  implements DiscussionRepositoryPort
{
  protected readonly tableName = DiscussionDbEntity.name;

  constructor(
    readonly mapper: DiscussionMapper,
    @InjectRepository(DiscussionDbEntity)
    readonly discussionRepository: Repository<DiscussionDbEntity>,
  ) {
    super(discussionRepository, mapper, new Logger(DiscussionRepository.name));
  }
}
