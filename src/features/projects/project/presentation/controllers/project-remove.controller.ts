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
    @Query('tagId', new ParseUUIDPipe()) tagId: string,
  ): Promise<void> {
    this.projectTagDto.projectId = id;
    this.projectTagDto.tagId = tagId;

    await this.projectTagRemoveService.handle(this.projectTagDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/team-users')
  async removeTeamUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('teamUserId', new ParseUUIDPipe()) teamUserId: string,
  ): Promise<void> {
    this.projectTeamUserDto.projectId = id;
    this.projectTeamUserDto.teamUserId = teamUserId;

    await this.projectTeamUserRemoveService.handle(this.projectTeamUserDto);
  }
}
