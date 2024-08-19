import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  colorId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  iconId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
