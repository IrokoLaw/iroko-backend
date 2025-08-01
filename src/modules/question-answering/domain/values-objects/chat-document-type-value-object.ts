import { ValueObject } from '@/libs/domain/value-object.base';
import { ArgumentInvalidException } from '@/libs/exceptions';

export enum DocumentTypeEnum {
  'CONSTITUTION' = 'CONSTITUTION',
  'DECREES' = 'DECREES',
  'TREATIES' = 'TREATIES',
  'ORDERS' = 'ORDERS',
  'LAWS' = 'LAWS',
  'JURISPRUDENCE' = 'JURISPRUDENCE',
  'ORDINANCES' = 'ORDINANCES',
  'CIRCULARS' = 'CIRCULARS',
}

export class ChatDocumentType extends ValueObject<
  DocumentTypeEnum | undefined
> {
  constructor(props: { value: DocumentTypeEnum | undefined }) {
    super({ value: props.value });
    this.validate({ value: this.props.value });
  }

  protected validate(props: { value: DocumentTypeEnum | undefined }): void {
    if (
      props.value !== undefined &&
      !Object.values(DocumentTypeEnum).includes(props.value)
    ) {
      throw new ArgumentInvalidException('Document type is invalid');
    }
  }
}
