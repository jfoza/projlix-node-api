import { UserTypesEnum } from '@/common/enums/user-types.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProfileFiltersDto {
  @IsOptional()
  @IsEnum(UserTypesEnum)
  @Transform(({ value }) => (value === '' ? undefined : value))
  type: string;

  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  uniqueName?: string[];
}
