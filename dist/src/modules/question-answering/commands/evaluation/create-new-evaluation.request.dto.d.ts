import { EvaluationNoteEnum } from '../../domain/values-objects/evaluation-note-value-object';
export declare class CreateNewEvaluationRequestDto {
    note: EvaluationNoteEnum;
    comment?: string;
}
export declare class UpdateEvaluationRequestDto extends CreateNewEvaluationRequestDto {
}
