import { Injectable } from '@nestjs/common';
import { Mapper } from '@/libs/domain/mapper.interface';
import { UserAccountAssociationResponseDto } from '../dtos/user-account-association.response.dto';
import { RoleEnum } from '../domain/value-objects/userAccountAssociation-role-value-object';
import { z } from 'zod';
import { UserAccountAssociationDbEntity } from '../infrastructure/persistance/user-account-association.entity.db';
import { UserAccountAssociationEntity } from '../domain/entities/user-account-association/user-account-association.entity';

export const userAccountAssociationSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  userId: z.string(),
  accountId: z.string(),
  role: z.nativeEnum(RoleEnum),
  dateAjout: z.preprocess((val: any) => new Date(val), z.date()),
});

export type UserAccountAssociationModel = z.TypeOf<
  typeof userAccountAssociationSchema
>;

@Injectable()
export class UserAccountAssociationMapper
  implements
    Mapper<
      UserAccountAssociationEntity,
      UserAccountAssociationModel,
      UserAccountAssociationResponseDto
    >
{
  toDomain(
    dbEntity: UserAccountAssociationDbEntity,
  ): UserAccountAssociationEntity {
    const { id, userId, accountId, role, createdAt, updatedAt } = dbEntity;
    return new UserAccountAssociationEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        accountId,
        userId,
        role,
      },
    });
  }

  toPersistence(
    domainEntity: UserAccountAssociationEntity,
  ): UserAccountAssociationDbEntity {
    const copy = domainEntity.getProps();
    const record: UserAccountAssociationModel = {
      id: copy.id,
      accountId: copy.accountId,
      userId: copy.userId,
      role: copy.role,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };

    userAccountAssociationSchema.parse(record);

    const dbEntity = new UserAccountAssociationDbEntity();
    Object.assign(dbEntity, record);

    return dbEntity;
  }

  toResponse(
    domainEntity: UserAccountAssociationEntity,
  ): UserAccountAssociationResponseDto {
    const props = domainEntity.getProps();
    return new UserAccountAssociationResponseDto(props);
  }
}
