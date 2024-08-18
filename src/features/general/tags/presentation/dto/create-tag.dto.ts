import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  color?: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
