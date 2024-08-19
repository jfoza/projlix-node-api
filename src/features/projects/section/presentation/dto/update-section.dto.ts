import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  @Transform(({ value }) => (value === '' ? undefined : value))
  colorId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  @Transform(({ value }) => (value === '' ? undefined : value))
  iconId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
