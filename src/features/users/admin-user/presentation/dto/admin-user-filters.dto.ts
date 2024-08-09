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
import { Type } from 'class-transformer';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class AdminUserFiltersDto extends FiltersDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsIn(['name', 'email'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  columnName: string | null = null;
}
