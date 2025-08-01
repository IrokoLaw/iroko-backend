import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum BrandEnum {
  'VISA' = 'VISA',
  'MASTERCARD' = 'MASTERCARD',
}

export class Brand extends ValueObject<BrandEnum> {
  constructor(props: { value: BrandEnum }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: BrandEnum }): void {
    if (!Object.values(BrandEnum).includes(props.value)) {
      throw new ArgumentInvalidException('Brand is invalid');
    }
  }
}
