import { UserQueryHandler } from './user-query-handler';
import { PaginatedQueryRequestDto } from '@/libs/api/paginated-query.request.dto';
import { UserPaginatedResponseDto } from '../dtos/user.paginated.response.dto';
export declare class UserQueryHttpController {
    private readonly handler;
    constructor(handler: UserQueryHandler);
    findUsers(queryParams: PaginatedQueryRequestDto): Promise<UserPaginatedResponseDto>;
}
