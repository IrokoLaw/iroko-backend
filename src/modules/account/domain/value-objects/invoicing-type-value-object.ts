import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum InvoicingTypeEnum {
  'MONTHLY' = 'MONTHLY',
  'ANNUAL' = 'ANNUAL',
  'TRY' = 'TRY',
}

export class InvoicingType extends ValueObject<InvoicingTypeEnum> {
  constructor(props: { value: InvoicingTypeEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: InvoicingTypeEnum }): void {
    if (!Object.values(InvoicingTypeEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Invoicing type is invalid');
    }
  }
}
