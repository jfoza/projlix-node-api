import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  icon_id: string;
  unique_name?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
