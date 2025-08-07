import { ResponseBase } from "@/libs/api/response.base";
import { EvaluationNoteEnum } from "../domain/values-objects/evaluation-note-value-object";
import { EvaluationEntityProps } from "../domain/entities/evaluation/evaluation.type";
export declare class EvaluationResponseDto extends ResponseBase {
    constructor(props: EvaluationEntityProps);
    note: EvaluationNoteEnum;
    comment?: string;
    chatId: string;
}
