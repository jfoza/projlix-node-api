import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class SectionFiltersDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  @Transform(({ value }) => (value === '' ? undefined : value))
  projectId: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  projectUniqueName: string;
}
