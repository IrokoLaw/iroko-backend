import { ValueObject } from "@/libs/domain/value-object.base";
export declare enum ActionEnum {
    "PRECISION" = "PRECISION",
    "MODIFICATION" = "MODIFICATION",
    "APPLICATION" = "MISE EN APPLICATION",
    "RAS" = "RAS",
    "NAN" = "",
    "APPROBATION" = "APPROBATION",
    "ABROGATION" = "ABROGATION",
    "RATIFICATION" = "RATIFICATION",
    "MODIFIE" = "MODIFIE ET COMPLETE",
    "PUBLICATION" = "PUBLICATION",
    "EMPTY" = "EMPTY"
}
export declare class SourceAction extends ValueObject<ActionEnum> {
    constructor(props: {
        value: ActionEnum;
    });
    protected validate(props: {
        value: ActionEnum;
    }): void;
}
