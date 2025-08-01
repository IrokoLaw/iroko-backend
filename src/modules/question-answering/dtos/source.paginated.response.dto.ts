import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@/libs/api/paginated.response.base';
import { SourceResponseDto } from './source.response.dto';

export class SourcePaginatedResponseDto extends PaginatedResponseDto<SourceResponseDto> {
  @ApiProperty({ type: SourceResponseDto, isArray: true })
  readonly data: readonly SourceResponseDto[];
}
