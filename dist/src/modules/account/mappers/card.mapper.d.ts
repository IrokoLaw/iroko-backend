import { z } from 'zod';
import { BrandEnum } from '../domain/value-objects/brand-value-object';
import { CardStatusEnum } from '../domain/value-objects/card-status-value-object';
import { Mapper } from '@/libs/domain/mapper.interface';
import { CardEntity } from '../domain/entities/card/card.entity';
import { CardResponseDto } from '../dtos/card.response.dto';
import { CardDbEntity } from '../infrastructure/persistance/card.entity.db';
export declare const cardSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    brand: z.ZodNativeEnum<typeof BrandEnum>;
    token: z.ZodString;
    expMonth: z.ZodNumber;
    expYear: z.ZodNumber;
    holderName: z.ZodString;
    status: z.ZodNativeEnum<typeof CardStatusEnum>;
    userId: z.ZodString;
    numberLast4: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: CardStatusEnum;
    brand?: BrandEnum;
    token?: string;
    numberLast4?: string;
    expMonth?: number;
    expYear?: number;
    holderName?: string;
    userId?: string;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    status?: CardStatusEnum;
    brand?: BrandEnum;
    token?: string;
    numberLast4?: string;
    expMonth?: number;
    expYear?: number;
    holderName?: string;
    userId?: string;
}>;
export type CardModel = z.TypeOf<typeof cardSchema>;
export declare class CardMapper implements Mapper<CardEntity, CardModel, CardResponseDto> {
    toDomain(dbEntity: CardDbEntity): CardEntity;
    toPersistence(domainEntity: CardEntity): CardDbEntity;
    toResponse(domainEntity: CardEntity): CardResponseDto;
}
