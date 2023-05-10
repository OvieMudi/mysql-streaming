import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDtoParameters } from './interfaces/pagination-meta-dto.interface';

export class PaginationMetaDto {
  @ApiProperty()
  readonly cursor: number;

  nextCursor: number;

  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly itemCount: number;

  constructor({
    paginationOptionsDto,
    itemCount,
  }: PaginationMetaDtoParameters) {
    this.cursor = paginationOptionsDto.cursor;
    this.nextCursor = paginationOptionsDto.nextCursor;
    this.limit = paginationOptionsDto.limit;
    this.itemCount = itemCount;
  }
}
