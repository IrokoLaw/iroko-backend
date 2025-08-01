import { IdResponse } from '@/libs/api/id.response.dto';
import { PaginatedQueryRequestDto } from '@/libs/api/paginated-query.request.dto';
import { CreateUserRequestDto } from '@/modules/account/commands/create-user.request.dto';
import { UserPaginatedResponseDto } from '@/modules/account/dtos/user.paginated.response.dto';
export declare class ApiClient {
    private url;
    createUser(dto: CreateUserRequestDto): Promise<IdResponse>;
    findAllUser(dto: PaginatedQueryRequestDto): Promise<UserPaginatedResponseDto>;
}
