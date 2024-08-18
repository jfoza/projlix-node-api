import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { FiltersDto } from '@/common/presentation/dto/FiltersDto';
import { Transform, Type } from 'class-transformer';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class AdminUserFiltersDto extends FiltersDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  email?: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsIn(['name', 'email', 'created_at'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
