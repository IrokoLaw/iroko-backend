import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum EvaluationNoteEnum {
  'BAD' = 'BAD',
  'USEFUL' = 'USEFUL',
  'GREAT' = 'GREAT',
  'NOT_SATISFIED' = 'NOT_SATISFIED',
  'SATISFIED' = 'SATISFIED',
}

export class EvaluationNote extends ValueObject<EvaluationNoteEnum> {
  constructor(props: { value: EvaluationNoteEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: EvaluationNoteEnum }): void {
    if (!Object.values(EvaluationNoteEnum).includes(props.value)) {
      throw new ArgumentInvalidException(' Evaluation note is invalid');
    }
  }
}
