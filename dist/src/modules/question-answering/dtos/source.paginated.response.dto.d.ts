import { PaginatedResponseDto } from '@/libs/api/paginated.response.base';
import { SourceResponseDto } from './source.response.dto';
export declare class SourcePaginatedResponseDto extends PaginatedResponseDto<SourceResponseDto> {
    readonly data: readonly SourceResponseDto[];
}
