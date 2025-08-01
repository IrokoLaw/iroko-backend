import { PaginatedParams, PaginatedQueryBase } from '@/libs/domain/query.base';
import { Inject, Injectable } from '@nestjs/common';

import { Ok, Result } from 'oxide.ts';
import { USER_REPOSITORY } from '../user.di-token';
import { UserRepositoryPort } from '../infrastructure/persistance/repositories/user.repository.port';
import { Paginated } from '@/libs/domain/repository.port';
import { UserEntity } from '../domain/entities/user/user.entity';
import { UserProps } from '../domain/entities/user/user.types';

export class FindUsersQuery extends PaginatedQueryBase<UserProps> {
  constructor(props: PaginatedParams<FindUsersQuery, UserProps>) {
    super(props);
  }
}

@Injectable()
export class UserQueryHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async list(
    query: FindUsersQuery,
  ): Promise<Result<Paginated<UserEntity>, Error>> {
    const records = await this.repository.findAllPaginated({
      page: query.page,
      limit: query.limit,
      orderBy: query.orderBy,
    });

    return Ok(
      new Paginated({
        data: records.data,
        count: records.count,
        limit: query.limit,
        page: query.page,
      }),
    );
  }
}
