import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTagDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  tagId: string;
}
