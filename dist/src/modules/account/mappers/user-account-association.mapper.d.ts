import { Mapper } from '@/libs/domain/mapper.interface';
import { UserAccountAssociationResponseDto } from '../dtos/user-account-association.response.dto';
import { RoleEnum } from '../domain/value-objects/userAccountAssociation-role-value-object';
import { z } from 'zod';
import { UserAccountAssociationDbEntity } from '../infrastructure/persistance/user-account-association.entity.db';
import { UserAccountAssociationEntity } from '../domain/entities/user-account-association/user-account-association.entity';
export declare const userAccountAssociationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    userId: z.ZodString;
    accountId: z.ZodString;
    role: z.ZodNativeEnum<typeof RoleEnum>;
    dateAjout: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    accountId?: string;
    role?: RoleEnum;
    dateAjout?: Date;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    userId?: string;
    accountId?: string;
    role?: RoleEnum;
    dateAjout?: unknown;
}>;
export type UserAccountAssociationModel = z.TypeOf<typeof userAccountAssociationSchema>;
export declare class UserAccountAssociationMapper implements Mapper<UserAccountAssociationEntity, UserAccountAssociationModel, UserAccountAssociationResponseDto> {
    toDomain(dbEntity: UserAccountAssociationDbEntity): UserAccountAssociationEntity;
    toPersistence(domainEntity: UserAccountAssociationEntity): UserAccountAssociationDbEntity;
    toResponse(domainEntity: UserAccountAssociationEntity): UserAccountAssociationResponseDto;
}
