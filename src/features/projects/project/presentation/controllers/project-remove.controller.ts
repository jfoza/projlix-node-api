import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IProjectRemoveService } from '@/features/projects/project/interfaces/services/project-remove.service.interface';
import { IProjectTagRemoveService } from '@/features/projects/project/interfaces/services/project-tag-remove.service.interface';
import { IProjectTeamUserRemoveService } from '@/features/projects/project/interfaces/services/project-team-user-remove.service.interface';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectRemoveController {
  @Inject('IProjectRemoveService')
  private readonly projectRemoveService: IProjectRemoveService;

  @Inject('IProjectTagRemoveService')
  private readonly projectTagRemoveService: IProjectTagRemoveService;

  @Inject('IProjectTeamUserRemoveService')
  private readonly projectTeamUserRemoveService: IProjectTeamUserRemoveService;

  @Inject(ProjectTeamUserDto)
  private readonly projectTeamUserDto: ProjectTeamUserDto;

  @Inject(ProjectTagDto)
  private readonly projectTagDto: ProjectTagDto;

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.projectRemoveService.handle(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/tags')
  async removeTag(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('tag_id', new ParseUUIDPipe()) tag_id: string,
  ): Promise<void> {
    this.projectTagDto.project_id = id;
    this.projectTagDto.tag_id = tag_id;

    await this.projectTagRemoveService.handle(this.projectTagDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/team-users')
  async removeTeamUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('team_user_id', new ParseUUIDPipe()) team_user_id: string,
  ): Promise<void> {
    this.projectTeamUserDto.project_id = id;
    this.projectTeamUserDto.team_user_id = team_user_id;

    await this.projectTeamUserRemoveService.handle(this.projectTeamUserDto);
  }
}
