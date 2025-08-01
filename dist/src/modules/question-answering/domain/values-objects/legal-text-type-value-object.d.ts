import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum LegalTextTypeEnum {
    'LOI' = "LOI",
    'ORDONNANCE' = "ORDONNANCE",
    'DECRET' = "DECRET",
    'ARRETE' = "ARRETE",
    'JURISPRUDENCE' = "JURISPRUDENCE",
    'TRAITE_OHADA' = "TRAITE OHADA",
    'DOCTRINE' = "DOCTRINE"
}
export declare class LegalTextType extends ValueObject<LegalTextTypeEnum> {
    constructor(props: {
        value: LegalTextTypeEnum;
    });
    protected validate(props: {
        value: LegalTextTypeEnum;
    }): void;
}
