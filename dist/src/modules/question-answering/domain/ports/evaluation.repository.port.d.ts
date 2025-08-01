import { RepositoryPort } from '@/libs/domain/repository.port';
import { EvaluationEntity } from '../entities/evaluation/evaluation.entity';
import { EvaluationProps } from '../entities/evaluation/evaluation.type';
export interface EvaluationRepositoryPort extends RepositoryPort<EvaluationEntity> {
    update(id: string, props: Omit<EvaluationProps, 'chatId'>): Promise<void>;
}
