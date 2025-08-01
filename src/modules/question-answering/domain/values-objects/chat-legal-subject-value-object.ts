import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum LegalSubjectEnum {
  'LABOR_LAW' = 'labor_law',
  'DEFAULT_LAW' = 'all',
}

export class ChatLegalSubject extends ValueObject<
  LegalSubjectEnum | undefined
> {
  constructor(props: { value: LegalSubjectEnum | undefined }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: LegalSubjectEnum | undefined }): void {
    if (
      props.value !== undefined &&
      !Object.values(LegalSubjectEnum).includes(props.value)
    ) {
      throw new ArgumentInvalidException('The matter is invalid');
    }
  }
}
