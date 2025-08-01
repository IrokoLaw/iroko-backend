import { Mapper } from '@/libs/domain/mapper.interface';
import { UserEntity } from '../domain/entities/user/user.entity';
import { UserResponseDto } from '../dtos/user.response.dto';
import { UserDbEntity } from '../infrastructure/persistance/user.entity.db';
import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { UserRoleEnum } from '../domain/value-objects/user-role-value-object';

export const userSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  firstName: z.string().min(2).max(150),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  externalUserId: z.string().min(1).max(150),
  UserRole: z.nativeEnum(UserRoleEnum),
});

export type UserModel = z.TypeOf<typeof userSchema>;
@Injectable()
export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponseDto>
{
  toDomain(dbEntity: UserDbEntity): UserEntity {
    const {
      id,
      firstName,
      lastName,
      email,
      externalUserId,
      userRole,
      createdAt,
      updatedAt,
    } = dbEntity;
    return new UserEntity({
      id,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      props: {
        firstName,
        lastName,
        email,
        externalUserId,
        userRole,
      },
    });
  }

  toPersistence(domainEntity: UserEntity): UserDbEntity {
    const copy = domainEntity.getProps();

    const record: UserModel = {
      id: copy.id,
      firstName: copy.firstName,
      lastName: copy.lastName,
      email: copy.email,
      externalUserId: copy.externalUserId,
      UserRole: copy.userRole,
      createdAt: copy.createdAt,
      updatedAt: copy.updatedAt,
    };

    userSchema.parse(record);

    const dbEntity = new UserDbEntity();
    Object.assign(dbEntity, record);

    return dbEntity;
  }

  toResponse(domainEntity: UserEntity): UserResponseDto {
    const props = domainEntity.getProps();
    const response = new UserResponseDto(props);
    return response;
  }
}
