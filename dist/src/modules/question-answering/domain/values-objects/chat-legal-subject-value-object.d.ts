import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum LegalSubjectEnum {
    'LABOR_LAW' = "labor_law",
    'DEFAULT_LAW' = "all"
}
export declare class ChatLegalSubject extends ValueObject<LegalSubjectEnum | undefined> {
    constructor(props: {
        value: LegalSubjectEnum | undefined;
    });
    protected validate(props: {
        value: LegalSubjectEnum | undefined;
    }): void;
}
