import { Mapper } from '@/libs/domain/mapper.interface';
import { UserEntity } from '../domain/entities/user/user.entity';
import { UserResponseDto } from '../dtos/user.response.dto';
import { UserDbEntity } from '../infrastructure/persistance/user.entity.db';
import { z } from 'zod';
import { UserRoleEnum } from '../domain/value-objects/user-role-value-object';
export declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    externalUserId: z.ZodString;
    UserRole: z.ZodNativeEnum<typeof UserRoleEnum>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    firstName?: string;
    lastName?: string;
    email?: string;
    externalUserId?: string;
    UserRole?: UserRoleEnum;
}, {
    id?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
    firstName?: string;
    lastName?: string;
    email?: string;
    externalUserId?: string;
    UserRole?: UserRoleEnum;
}>;
export type UserModel = z.TypeOf<typeof userSchema>;
export declare class UserMapper implements Mapper<UserEntity, UserModel, UserResponseDto> {
    toDomain(dbEntity: UserDbEntity): UserEntity;
    toPersistence(domainEntity: UserEntity): UserDbEntity;
    toResponse(domainEntity: UserEntity): UserResponseDto;
}
