import { z } from 'zod';
import { BrandEnum } from '../domain/value-objects/brand-value-object';
import { CardStatusEnum } from '../domain/value-objects/card-status-value-object';
import { Injectable } from '@nestjs/common';
import { Mapper } from '@/libs/domain/mapper.interface';
import { CardEntity } from '../domain/entities/card/card.entity';
import { CardResponseDto } from '../dtos/card.response.dto';
import { CardDbEntity } from '../infrastructure/persistance/card.entity.db';

export const cardSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  brand: z.nativeEnum(BrandEnum),
  token: z.string(),
  expMonth: z.number(),
  expYear: z.number(),
  holderName: z.string(),
  status: z.nativeEnum(CardStatusEnum),
  userId: z.string(),
  numberLast4: z.string(),
});

export type CardModel = z.TypeOf<typeof cardSchema>;
@Injectable()
export class CardMapper
  implements Mapper<CardEntity, CardModel, CardResponseDto>
{
  toDomain(dbEntity: CardDbEntity): CardEntity {
    const {
      id,
      brand,
      token,
      expMonth,
      expYear,
      holderName,
      status,
      isPrincipal,
      createdAt,
      updatedAt,
      numberLast4,
      userId,
    } = dbEntity;
    return new CardEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),

      props: {
        brand,
        token,
        expMonth,
        expYear,
        holderName,
        status,
        isPrincipal,
        userId,
        numberLast4,
      },
    });
  }

  toPersistence(domainEntity: CardEntity): CardDbEntity {
    const copy = domainEntity.getProps();
    const record: CardModel = {
      id: copy.id,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
      brand: copy.brand,
      token: copy.token,
      expYear: copy.expYear,
      expMonth: copy.expMonth,
      holderName: copy.holderName,
      status: copy.status,
      numberLast4: copy.numberLast4,
      userId: copy.userId,
    };
    cardSchema.parse(record);
    const dbEntity = new CardDbEntity();
    Object.assign(dbEntity, record);

    return dbEntity;
  }

  toResponse(domainEntity: CardEntity): CardResponseDto {
    const props = domainEntity.getProps();

    const response = new CardResponseDto(props);
    return response;
  }
}
