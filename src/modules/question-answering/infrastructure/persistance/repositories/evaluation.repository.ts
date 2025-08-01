import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { EvaluationMapper } from '@/modules/question-answering/mapper/evaluation.mapper';
import { EvaluationDbEntity } from '../evaluation.entity.db';
import { EvaluationRepositoryPort } from '@/modules/question-answering/domain/ports/evaluation.repository.port';
import { EvaluationEntity } from '@/modules/question-answering/domain/entities/evaluation/evaluation.entity';
import { EvaluationProps } from '@/modules/question-answering/domain/entities/evaluation/evaluation.type';

@Injectable()
export class EvaluationRepository
  extends RepositoryBase<EvaluationEntity, EvaluationDbEntity>
  implements EvaluationRepositoryPort
{
  protected readonly tableName = EvaluationDbEntity.name;

  constructor(
    readonly mapper: EvaluationMapper,
    @InjectRepository(EvaluationDbEntity)
    readonly evaluationRepository: Repository<EvaluationDbEntity>,
  ) {
    super(evaluationRepository, mapper, new Logger(EvaluationRepository.name));
  }

  async update(
    id: string,
    props: Omit<EvaluationProps, 'chatId'>,
  ): Promise<void> {
    await this.evaluationRepository.update(id, props);
  }
}
