import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum LegalTextTypeEnum {
  'LOI' = 'LOI',
  'ORDONNANCE' = 'ORDONNANCE',
  'DECRET' = 'DECRET',
  'ARRETE' = 'ARRETE',
  'JURISPRUDENCE' = 'JURISPRUDENCE',
  'TRAITE_OHADA' = 'TRAITE OHADA',
  'DOCTRINE' = 'DOCTRINE',
}

export class LegalTextType extends ValueObject<LegalTextTypeEnum> {
  constructor(props: { value: LegalTextTypeEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: LegalTextTypeEnum }): void {
    if (
      props.value !== undefined &&
      !Object.values(LegalTextTypeEnum).includes(props.value)
    ) {
      throw new ArgumentInvalidException('The legal text type is invalid');
    }
  }
}
