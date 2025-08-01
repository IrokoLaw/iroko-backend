import { z } from 'zod';
import { DiscussionEntity } from '../domain/entities/discussion/discussion.entity';
import { Mapper } from '@/libs/domain/mapper.interface';
import { DiscussionResponseDto } from '../dtos/discussion.response.dto';
import { DiscussionDbEntity } from '../infrastructure/persistance/discussion.entity.db';
export declare const discussionSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    userId: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    title?: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
}, {
    title?: string;
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    userId?: string;
}>;
export type DiscussionModel = z.TypeOf<typeof discussionSchema>;
export declare class DiscussionMapper implements Mapper<DiscussionEntity, DiscussionModel, DiscussionResponseDto> {
    toDomain(dbEntity: DiscussionDbEntity): DiscussionEntity;
    toPersistence(domainEntity: DiscussionEntity): DiscussionDbEntity;
    toResponse(domainEntity: DiscussionEntity): DiscussionResponseDto;
}
