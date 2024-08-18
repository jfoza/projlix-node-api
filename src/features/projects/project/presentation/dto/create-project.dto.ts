import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  iconId: string;
  uniqueName?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
