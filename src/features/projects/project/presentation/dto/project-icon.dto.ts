import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProjectIconDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  icon_id: string;
}
