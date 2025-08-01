import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../infrastructure/persistance/repositories/user.repository.port';
import { Transactional } from 'typeorm-transactional';
import { CreateUserProps } from '../domain/entities/user/user.types';
import { Err, Ok } from 'oxide.ts';

import { ConflictException } from '@/libs/exceptions';
import { USER_REPOSITORY } from '../user.di-token';
import { UserEntity } from '../domain/entities/user/user.entity';
import { UserAlreadyExistsError } from '../domain/entities/user/user.errors';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    protected readonly userRepo: UserRepositoryPort,
  ) {}

  @Transactional()
  async create(data: CreateUserProps) {
    const user = UserEntity.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      externalUserId: data.externalUserId,
      userRole: data.userRole,
    });

    try {
      await this.userRepo.transaction(async () => this.userRepo.insert(user));
      return Ok(user.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
