import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTeamUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  project_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  team_user_id: string;
}
