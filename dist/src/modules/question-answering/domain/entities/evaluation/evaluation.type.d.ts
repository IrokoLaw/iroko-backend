import { BaseEntityProps } from '@/libs/domain/entity.base';
import { EvaluationNoteEnum } from '../../values-objects/evaluation-note-value-object';
export interface EvaluationProps {
    note: EvaluationNoteEnum;
    comment?: string;
    chatId: string;
}
export interface CreateEvaluationProps {
    note: EvaluationNoteEnum;
    comment?: string;
    chatId: string;
}
export interface EvaluationEntityProps extends EvaluationProps, BaseEntityProps {
}
