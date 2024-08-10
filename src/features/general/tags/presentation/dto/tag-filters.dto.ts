import { FiltersDto } from '@/common/presentation/dto/FiltersDto';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class TagFiltersDto extends FiltersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number | null = null;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  perPage: number | null = 100;
}
