import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTagDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  project_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tag_id: string;
}
