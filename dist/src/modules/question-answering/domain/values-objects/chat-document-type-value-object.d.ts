import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum DocumentTypeEnum {
    'CONSTITUTION' = "CONSTITUTION",
    'DECREES' = "DECREES",
    'TREATIES' = "TREATIES",
    'ORDERS' = "ORDERS",
    'LAWS' = "LAWS",
    'JURISPRUDENCE' = "JURISPRUDENCE",
    'ORDINANCES' = "ORDINANCES",
    'CIRCULARS' = "CIRCULARS"
}
export declare class ChatDocumentType extends ValueObject<DocumentTypeEnum | undefined> {
    constructor(props: {
        value: DocumentTypeEnum | undefined;
    });
    protected validate(props: {
        value: DocumentTypeEnum | undefined;
    }): void;
}
