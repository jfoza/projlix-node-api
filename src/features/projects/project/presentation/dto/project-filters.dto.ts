import { FiltersDto } from '@/common/presentation/dto/FiltersDto';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectFiltersDto extends FiltersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number | null = null;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  perPage: number | null = 100;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  projectsId: string[];
}
