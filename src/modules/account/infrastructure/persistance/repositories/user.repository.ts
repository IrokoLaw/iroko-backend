import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from './user.repository.port';
import { RepositoryBase } from '@/libs/db/reposiroty.base';
import { UserDbEntity } from '../user.entity.db';
import { UserMapper } from '@/modules/account/mappers/user.mapper';
import { UserEntity } from '@/modules/account/domain/entities/user/user.entity';

@Injectable()
export class UserRepository
  extends RepositoryBase<UserEntity, UserDbEntity>
  implements UserRepositoryPort
{
  protected readonly tableName = 'users';

  constructor(
    readonly mapper: UserMapper,
    @InjectRepository(UserDbEntity)
    readonly userRepository: Repository<UserDbEntity>,
  ) {
    super(userRepository, mapper, new Logger(UserRepository.name));
  }
}
