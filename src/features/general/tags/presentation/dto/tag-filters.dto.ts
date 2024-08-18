import { FiltersDto } from '@/common/presentation/dto/FiltersDto';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class TagFiltersDto extends FiltersDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  name?: string;

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
  @IsIn(['name', 'created_at', 'active'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
