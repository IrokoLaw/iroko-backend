import { routesV1 } from '@/config/routes';
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { FindUsersQuery, UserQueryHandler } from './user-query-handler';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginatedQueryRequestDto } from '@/libs/api/paginated-query.request.dto';
import { Result } from 'oxide.ts';
import { Paginated } from '@/libs/domain/repository.port';
import { ResponseBase } from '@/libs/api/response.base';
import { UserPaginatedResponseDto } from '../dtos/user.paginated.response.dto';
import { UserEntity } from '../domain/entities/user/user.entity';

@Controller(routesV1.version)
export class UserQueryHttpController {
  constructor(private readonly handler: UserQueryHandler) {}

  @Get(routesV1.user.root)
  @ApiOperation({ summary: 'Users projects' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPaginatedResponseDto,
  })
  async findUsers(
    @Query() queryParams: PaginatedQueryRequestDto,
  ): Promise<UserPaginatedResponseDto> {
    const query = new FindUsersQuery({
      limit: queryParams.limit ?? 10,
      page: queryParams.page ?? 1,
    });

    const result: Result<
      Paginated<UserEntity>,
      Error
    > = await this.handler.list(query);

    const paginated = result.unwrap();

    // Whitelisting returned properties

    return new UserPaginatedResponseDto({
      ...paginated,
      data: paginated.data.map((user) => ({
        ...new ResponseBase({
          id: user.id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
        firstName: user.getProps().firstName,
        lastName: user.getProps().lastName,
        email: user.getProps().email,
        externalUserId: user.getProps().externalUserId,
      })),
    });
  }
}
