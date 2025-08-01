import { Mapper } from '@/libs/domain/mapper.interface';
import { AccountTypeEnum } from '../domain/value-objects/account-type-value-object';
import { InvoicingTypeEnum } from '../domain/value-objects/invoicing-type-value-object';
import { AccountStatusEnum } from '../domain/value-objects/account-status-value-object';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../domain/entities/account/account.entity';
import { z } from 'zod';
import { AccountResponseDto } from '../dtos/account.response.dto';
import { AccountDbEntity } from '../infrastructure/persistance/account.entity.db';

export const accountSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  type: z.nativeEnum(AccountTypeEnum),
  invoicingType: z.nativeEnum(InvoicingTypeEnum),
  expirePaymentDate: z.preprocess(
    (val: Date) => (val instanceof Date ? val : new Date(val)),
    z.date(),
  ),
  capacity: z.number().min(1).max(100),
  status: z.nativeEnum(AccountStatusEnum),
});

export type AccountModel = z.TypeOf<typeof accountSchema>;
@Injectable()
export class AccountMapper
  implements Mapper<AccountEntity, AccountModel, AccountResponseDto>
{
  toDomain(dbEntity: AccountDbEntity): AccountEntity {
    const { id, type, invoicingType, expirePaymentDate, capacity, status } =
      dbEntity;
    return new AccountEntity({
      id,
      createdAt: new Date(dbEntity.createdAt),
      updatedAt: new Date(dbEntity.updatedAt),
      props: {
        type,
        invoicingType,
        expirePaymentDate,
        capacity,
        status,
      },
    });
  }

  toPersistence(domainEntity: AccountEntity): AccountDbEntity {
    const copy = domainEntity.getProps();

    const record: AccountModel = {
      id: copy.id,
      type: copy.type,
      invoicingType: copy.invoicingType,
      expirePaymentDate: copy.expirePaymentDate,
      capacity: copy.capacity,
      status: copy.status,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };

    accountSchema.parse(record);

    const dbEntity = new AccountDbEntity();
    Object.assign(dbEntity, record);

    return dbEntity;
  }

  toResponse(domainEntity: AccountEntity): AccountResponseDto {
    const props = domainEntity.getProps();
    return new AccountResponseDto(props);
  }
}
