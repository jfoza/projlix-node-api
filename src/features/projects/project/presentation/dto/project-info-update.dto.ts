import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectInfoUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  uniqueName?: string;
}
