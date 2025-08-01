import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateEvaluationProps, EvaluationProps } from './evaluation.type';
export declare class EvaluationEntity extends BaseEntity<EvaluationProps> {
    protected readonly _id: AggregateID;
    static create(data: CreateEvaluationProps): EvaluationEntity;
    validate(): void;
}
