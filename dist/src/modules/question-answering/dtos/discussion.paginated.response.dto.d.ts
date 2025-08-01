import { PaginatedResponseDto } from '@/libs/api/paginated.response.base';
import { DiscussionResponseDto } from './discussion.response.dto';
export declare class DiscussionPaginatedResponseDto extends PaginatedResponseDto<DiscussionResponseDto> {
    readonly data: readonly DiscussionResponseDto[];
}
