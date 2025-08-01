import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { RepositoryBase } from '@/libs/db/reposiroty.base';

import { SourceMapper } from '@/modules/question-answering/mapper/source.mapper';
import { SourceEntity } from '@/modules/question-answering/domain/entities/source/source.entity';
import { SourceDbEntity } from '../source.entity.db';
import { SourceRepositoryPort } from '../../../domain/ports/source.repository.port';

@Injectable()
export class SourceRepository
  extends RepositoryBase<SourceEntity, SourceDbEntity>
  implements SourceRepositoryPort
{
  protected readonly tableName = SourceDbEntity.name;

  constructor(
    readonly mapper: SourceMapper,
    @InjectRepository(SourceDbEntity)
    readonly sourceRepository: Repository<SourceDbEntity>,
  ) {
    super(sourceRepository, mapper, new Logger(SourceRepository.name));
  }

  async deleteByChatId(chatId: string): Promise<void> {
    await this.sourceRepository.delete({ chatId });
  }
}
