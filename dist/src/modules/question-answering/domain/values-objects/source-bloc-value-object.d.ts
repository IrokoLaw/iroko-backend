import { ValueObject } from '@/libs/domain/value-object.base';
export declare enum BlocEnum {
    'REGLEMENTAIRE' = "REGLEMENTAIRE",
    'LEGISLATIVE' = "LEGISLATIF",
    'COMMUNAUTAIRE' = "COMMUNAUTAIRE",
    'ACTES' = "ACTES"
}
export declare class SourceBloc extends ValueObject<BlocEnum> {
    constructor(props: {
        value: BlocEnum;
    });
    protected validate(props: {
        value: BlocEnum;
    }): void;
}
