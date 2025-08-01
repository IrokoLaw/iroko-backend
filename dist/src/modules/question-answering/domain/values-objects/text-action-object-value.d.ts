import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum ActionEnum {
    'PRECISION' = "PRECISION",
    'MODIFICATION' = "MODIFICATION",
    'APPLICATION' = "MISE EN APPLICATION",
    'RAS' = "RAS"
}
export declare class SourceAction extends ValueObject<ActionEnum> {
    constructor(props: {
        value: ActionEnum;
    });
    protected validate(props: {
        value: ActionEnum;
    }): void;
}
