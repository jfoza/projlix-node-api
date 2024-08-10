import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  color_id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
