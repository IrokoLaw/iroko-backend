import { Mapper } from '@/libs/domain/mapper.interface';
import { AccountTypeEnum } from '../domain/value-objects/account-type-value-object';
import { InvoicingTypeEnum } from '../domain/value-objects/invoicing-type-value-object';
import { AccountStatusEnum } from '../domain/value-objects/account-status-value-object';
import { AccountEntity } from '../domain/entities/account/account.entity';
import { z } from 'zod';
import { AccountResponseDto } from '../dtos/account.response.dto';
import { AccountDbEntity } from '../infrastructure/persistance/account.entity.db';
export declare const accountSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    type: z.ZodNativeEnum<typeof AccountTypeEnum>;
    invoicingType: z.ZodNativeEnum<typeof InvoicingTypeEnum>;
    expirePaymentDate: z.ZodEffects<z.ZodDate, Date, unknown>;
    capacity: z.ZodNumber;
    status: z.ZodNativeEnum<typeof AccountStatusEnum>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    status?: AccountStatusEnum;
    type?: AccountTypeEnum;
    updatedAt?: Date;
    invoicingType?: InvoicingTypeEnum;
    expirePaymentDate?: Date;
    capacity?: number;
}, {
    id?: string;
    createdAt?: unknown;
    status?: AccountStatusEnum;
    type?: AccountTypeEnum;
    updatedAt?: unknown;
    invoicingType?: InvoicingTypeEnum;
    expirePaymentDate?: unknown;
    capacity?: number;
}>;
export type AccountModel = z.TypeOf<typeof accountSchema>;
export declare class AccountMapper implements Mapper<AccountEntity, AccountModel, AccountResponseDto> {
    toDomain(dbEntity: AccountDbEntity): AccountEntity;
    toPersistence(domainEntity: AccountEntity): AccountDbEntity;
    toResponse(domainEntity: AccountEntity): AccountResponseDto;
}
