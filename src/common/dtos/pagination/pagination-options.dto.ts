import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { SortOrder } from './enums/sort-order.enum';

export class PaginationOptionsDto {
  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.ASC })
  @IsEnum(SortOrder)
  @IsOptional()
  readonly order?: SortOrder = SortOrder.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly cursor?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly nextCursor?: number = 1;

  @ApiPropertyOptional({
    minimum: 10,
    maximum: 10000,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(10000)
  @IsOptional()
  readonly limit?: number = 50;
}
