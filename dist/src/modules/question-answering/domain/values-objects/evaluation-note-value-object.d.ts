import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum EvaluationNoteEnum {
    'BAD' = "BAD",
    'USEFUL' = "USEFUL",
    'GREAT' = "GREAT",
    'NOT_SATISFIED' = "NOT_SATISFIED",
    'SATISFIED' = "SATISFIED"
}
export declare class EvaluationNote extends ValueObject<EvaluationNoteEnum> {
    constructor(props: {
        value: EvaluationNoteEnum;
    });
    protected validate(props: {
        value: EvaluationNoteEnum;
    }): void;
}
