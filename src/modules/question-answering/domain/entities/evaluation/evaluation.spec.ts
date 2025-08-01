import { EvaluationNoteEnum } from '../../values-objects/evaluation-note-value-object';
import { EvaluationEntity } from './evaluation.entity';
import { CreateEvaluationProps } from './evaluation.type';

describe('EvaluationEntity', () => {
  let validEvaluationData: CreateEvaluationProps;

  beforeEach(() => {
    validEvaluationData = {
      note: EvaluationNoteEnum.GREAT,
      comment: 'La réponse est correcte',
    };
  });

  test('should create an evaluation with valid data', () => {
    const evaluation = EvaluationEntity.create(validEvaluationData);

    expect(evaluation).toBeInstanceOf(EvaluationEntity);
    expect(evaluation.getProps().note).toBe(EvaluationNoteEnum.GREAT);
  });
});
