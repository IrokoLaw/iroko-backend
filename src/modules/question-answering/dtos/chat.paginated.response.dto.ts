import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@/libs/api/paginated.response.base';
import { ChatResponseDto } from './chat.response.dto';

export class ChatPaginatedResponseDto extends PaginatedResponseDto<ChatResponseDto> {
  @ApiProperty({ type: ChatResponseDto, isArray: true })
  readonly data: readonly ChatResponseDto[];
}
