import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum BlocEnum {
  'REGLEMENTAIRE' = 'REGLEMENTAIRE',
  'LEGISLATIVE' = 'LEGISLATIF',
  'COMMUNAUTAIRE' = 'COMMUNAUTAIRE',
  'ACTES' = 'ACTES',
}

export class SourceBloc extends ValueObject<BlocEnum> {
  constructor(props: { value: BlocEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: BlocEnum }): void {
    if (!Object.values(BlocEnum).includes(props.value)) {
      throw new ArgumentInvalidException('bloc is invalid');
    }
  }
}
