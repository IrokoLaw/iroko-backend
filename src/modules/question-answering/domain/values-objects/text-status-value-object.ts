import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum StatusEnum {
  'ROVOKED' = 'ABROGE',
  'APPLICABLE' = 'EN VIGUEUR',
  'UPDATED' = 'MODIFIE(EN VIGUEUR)',
}

export class SourceStatus extends ValueObject<StatusEnum> {
  constructor(props: { value: StatusEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: StatusEnum }): void {
    if (!Object.values(StatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException(' the status  is invalid');
    }
  }
}
