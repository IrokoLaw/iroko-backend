import { PaginatedResponseDto } from '@/libs/api/paginated.response.base';
import { ApiProperty } from '@nestjs/swagger';
import { DiscussionResponseDto } from './discussion.response.dto';

export class DiscussionPaginatedResponseDto extends PaginatedResponseDto<DiscussionResponseDto> {
  @ApiProperty({ type: DiscussionResponseDto, isArray: true })
  readonly data: readonly DiscussionResponseDto[];
}
