import {
  IsArray,
  IsBoolean,
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

export class TeamUserFiltersDto extends FiltersDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  name?: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => (value === '' ? undefined : value))
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  nameOrEmail?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  profileId?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  active?: boolean;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (value === '' ? undefined : value))
  projectsId?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (value === '' ? undefined : value))
  profilesUniqueName?: string[];

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  page: number;

  @IsOptional()
  @IsIn(['name', 'email', 'active'], {
    message: ErrorMessagesEnum.INVALID_COLUMN_NAME,
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  columnName: string | null = null;
}
