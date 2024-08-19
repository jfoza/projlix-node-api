import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTeamUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  teamUserId: string;
}
