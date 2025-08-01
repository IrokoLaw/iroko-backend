import { Injectable } from '@nestjs/common';
import { Mapper } from '@/libs/domain/mapper.interface';
import { TransactionEntity } from '../domain/entities/transaction/transaction.entity';
import { TransactionResponseDto } from '../dtos/transaction.response.dto';
import { TransactionDbEntity } from '../infrastructure/persistance/transaction.entity.db';
import { TransactionCurrencyEnum } from '../domain/value-objects/transaction-currency-value-object';
import { TransactionStatusEnum } from '../domain/value-objects/transaction-status-value-object';
import { TransactionMethodEnum } from '../domain/value-objects/transaction-method-value-object';
import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  amount: z.number(),
  currency: z.nativeEnum(TransactionCurrencyEnum),
  country: z.string(),
  status: z.nativeEnum(TransactionStatusEnum),
  cardId: z.string(),
  operationId: z.string(),
  method: z.nativeEnum(TransactionMethodEnum),
  date: z.preprocess(
    (val: Date) => (val instanceof Date ? val : new Date(val)),
    z.date(),
  ),
});

export type TransactionModel = z.TypeOf<typeof transactionSchema>;

@Injectable()
export class TransactionMapper
  implements Mapper<TransactionEntity, TransactionModel, TransactionResponseDto>
{
  toDomain(dbEntity: TransactionDbEntity): TransactionEntity {
    const {
      id,
      amount,
      currency,
      country,
      status,
      card,
      operationId,
      method,
      date,
      createdAt,
      updatedAt,
    } = dbEntity;

    return new TransactionEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        amount,
        currency,
        country,
        status,
        cardId: card.id,
        operationId,
        method,
        date,
      },
    });
  }

  toPersistence(domainEntity: TransactionEntity): TransactionDbEntity {
    const copy = domainEntity.getProps();
    const record: TransactionModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      amount: copy.amount,
      currency: copy.currency,
      country: copy.country,
      status: copy.status,
      cardId: copy.cardId,
      operationId: copy.operationId,
      method: copy.method,
      date: copy.date,
    };

    transactionSchema.parse(record);

    const dbEntity = new TransactionDbEntity();
    Object.assign(dbEntity, record);

    return dbEntity;
  }

  toResponse(domainEntity: TransactionEntity): TransactionResponseDto {
    const props = domainEntity.getProps();
    return new TransactionResponseDto(props);
  }
}
