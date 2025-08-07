import { BaseEntityDb } from "@/libs/db/base-entity-db";
import { EvaluationNoteEnum } from "../../domain/values-objects/evaluation-note-value-object";
export declare class EvaluationDbEntity extends BaseEntityDb {
    note: EvaluationNoteEnum;
    comment?: string;
    chatId: string;
}
