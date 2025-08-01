import { PaginatedResponseDto } from '@/libs/api/paginated.response.base';
import { ChatResponseDto } from './chat.response.dto';
export declare class ChatPaginatedResponseDto extends PaginatedResponseDto<ChatResponseDto> {
    readonly data: readonly ChatResponseDto[];
}
