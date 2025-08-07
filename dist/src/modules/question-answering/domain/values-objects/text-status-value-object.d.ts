import { ValueObject } from "@/libs/domain/value-object.base";
export declare enum StatusEnum {
    "ROVOKED" = "ABROGE",
    "APPLICABLE" = "EN VIGUEUR",
    "UPDATED" = "MODIFIE",
    "RAS" = "RAS",
    "NAN" = "",
    "EMPTY" = "EMPTY"
}
export declare class SourceStatus extends ValueObject<StatusEnum> {
    constructor(props: {
        value: StatusEnum;
    });
    protected validate(props: {
        value: StatusEnum;
    }): void;
}
