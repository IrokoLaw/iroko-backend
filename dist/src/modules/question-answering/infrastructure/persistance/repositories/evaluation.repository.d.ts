import { Repository } from 'typeorm';
import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { EvaluationMapper } from '@/modules/question-answering/mapper/evaluation.mapper';
import { EvaluationDbEntity } from '../evaluation.entity.db';
import { EvaluationRepositoryPort } from '@/modules/question-answering/domain/ports/evaluation.repository.port';
import { EvaluationEntity } from '@/modules/question-answering/domain/entities/evaluation/evaluation.entity';
import { EvaluationProps } from '@/modules/question-answering/domain/entities/evaluation/evaluation.type';
export declare class EvaluationRepository extends RepositoryBase<EvaluationEntity, EvaluationDbEntity> implements EvaluationRepositoryPort {
    readonly mapper: EvaluationMapper;
    readonly evaluationRepository: Repository<EvaluationDbEntity>;
    protected readonly tableName: string;
    constructor(mapper: EvaluationMapper, evaluationRepository: Repository<EvaluationDbEntity>);
    update(id: string, props: Omit<EvaluationProps, 'chatId'>): Promise<void>;
}
