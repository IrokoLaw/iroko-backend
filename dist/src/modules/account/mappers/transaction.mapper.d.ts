import { Mapper } from '@/libs/domain/mapper.interface';
import { TransactionEntity } from '../domain/entities/transaction/transaction.entity';
import { TransactionResponseDto } from '../dtos/transaction.response.dto';
import { TransactionDbEntity } from '../infrastructure/persistance/transaction.entity.db';
import { TransactionCurrencyEnum } from '../domain/value-objects/transaction-currency-value-object';
import { TransactionStatusEnum } from '../domain/value-objects/transaction-status-value-object';
import { TransactionMethodEnum } from '../domain/value-objects/transaction-method-value-object';
import { z } from 'zod';
export declare const transactionSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    updatedAt: z.ZodEffects<z.ZodDate, Date, unknown>;
    amount: z.ZodNumber;
    currency: z.ZodNativeEnum<typeof TransactionCurrencyEnum>;
    country: z.ZodString;
    status: z.ZodNativeEnum<typeof TransactionStatusEnum>;
    cardId: z.ZodString;
    operationId: z.ZodString;
    method: z.ZodNativeEnum<typeof TransactionMethodEnum>;
    date: z.ZodEffects<z.ZodDate, Date, unknown>;
}, "strip", z.ZodTypeAny, {
    id?: string;
    createdAt?: Date;
    status?: TransactionStatusEnum;
    date?: Date;
    updatedAt?: Date;
    amount?: number;
    currency?: TransactionCurrencyEnum;
    country?: string;
    cardId?: string;
    operationId?: string;
    method?: TransactionMethodEnum;
}, {
    id?: string;
    createdAt?: unknown;
    status?: TransactionStatusEnum;
    date?: unknown;
    updatedAt?: unknown;
    amount?: number;
    currency?: TransactionCurrencyEnum;
    country?: string;
    cardId?: string;
    operationId?: string;
    method?: TransactionMethodEnum;
}>;
export type TransactionModel = z.TypeOf<typeof transactionSchema>;
export declare class TransactionMapper implements Mapper<TransactionEntity, TransactionModel, TransactionResponseDto> {
    toDomain(dbEntity: TransactionDbEntity): TransactionEntity;
    toPersistence(domainEntity: TransactionEntity): TransactionDbEntity;
    toResponse(domainEntity: TransactionEntity): TransactionResponseDto;
}
