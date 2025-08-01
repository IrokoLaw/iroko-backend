import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum ActionEnum {
  'PRECISION' = 'PRECISION',
  'MODIFICATION' = 'MODIFICATION',
  'APPLICATION' = 'MISE EN APPLICATION',
  'RAS' = 'RAS',
}

export class SourceAction extends ValueObject<ActionEnum> {
  constructor(props: { value: ActionEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: ActionEnum }): void {
    if (!Object.values(ActionEnum).includes(props.value)) {
      throw new ArgumentInvalidException(' the action  is invalid');
    }
  }
}
