import { AggregateID, BaseEntity } from '@/libs/domain/entity.base';
import { CreateEvaluationProps, EvaluationProps } from './evaluation.type';
import { randomUUID } from 'crypto';
import { EvaluationNote } from '../../values-objects/evaluation-note-value-object';

export class EvaluationEntity extends BaseEntity<EvaluationProps> {
  protected readonly _id: AggregateID;

  static create(data: CreateEvaluationProps): EvaluationEntity {
    const id = randomUUID();
    const note = new EvaluationNote({ value: data.note });

    const evaluation = new EvaluationEntity({
      id,
      props: {
        ...data,
        note: note.unpack(),
      },
    });
    return evaluation;
  }

  public validate() {}
}
