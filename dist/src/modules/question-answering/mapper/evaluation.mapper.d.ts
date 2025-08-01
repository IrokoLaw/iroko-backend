import { z } from 'zod';
import { EvaluationNoteEnum } from '../domain/values-objects/evaluation-note-value-object';
import { EvaluationEntity } from '../domain/entities/evaluation/evaluation.entity';
import { EvaluationResponseDto } from '../dtos/evaluation.response.dto';
import { EvaluationDbEntity } from '../infrastructure/persistance/evaluation.entity.db';
import { Mapper } from '@/libs/domain/mapper.interface';
export declare const evaluationSchema: z.ZodObject<{
    id: z.ZodString;
    note: z.ZodNativeEnum<typeof EvaluationNoteEnum>;
    comment: z.ZodString;
    chatId: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    chatId?: string;
    note?: EvaluationNoteEnum;
    comment?: string;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    chatId?: string;
    note?: EvaluationNoteEnum;
    comment?: string;
}>;
export type EvaluationModel = z.TypeOf<typeof evaluationSchema>;
export declare class EvaluationMapper implements Mapper<EvaluationEntity, EvaluationModel, EvaluationResponseDto> {
    toDomain(dbEntity: EvaluationDbEntity): EvaluationEntity;
    toPersistence(domainEntity: EvaluationEntity): EvaluationDbEntity;
    toResponse(domainEntity: EvaluationEntity): EvaluationResponseDto;
}
