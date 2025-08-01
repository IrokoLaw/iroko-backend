import { routesV1 } from '@/config/routes';
import { IdResponse } from '@/libs/api/id.response.dto';
import { PaginatedQueryRequestDto } from '@/libs/api/paginated-query.request.dto';
import { CreateUserRequestDto } from '@/modules/account/commands/create-user.request.dto';
import { UserPaginatedResponseDto } from '@/modules/account/dtos/user.paginated.response.dto';
import { getHttpServer } from '@tests/setup/jestSetupAfterEnv';

export class ApiClient {
  private url = `/${routesV1.version}/${routesV1.user.root}`;

  async createUser(dto: CreateUserRequestDto): Promise<IdResponse> {
    const response = await getHttpServer().post(this.url).send(dto);
    return response.body;
  }

  async findAllUser(
    dto: PaginatedQueryRequestDto,
  ): Promise<UserPaginatedResponseDto> {
    const response = await getHttpServer().get(this.url).send(dto);
    return response.body;
  }
}
