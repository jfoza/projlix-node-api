import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { IProjectCreateService } from '@/features/projects/project/interfaces/services/project-create.service.interface';
import { IProjectAddTagService } from '@/features/projects/project/interfaces/services/project-add-tag.service.interface';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { IProjectAddTeamUserService } from '@/features/projects/project/interfaces/services/project-add-team-user.service.interface';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectCreateController {
  @Inject('IProjectCreateService')
  private readonly projectCreateService: IProjectCreateService;

  @Inject('IProjectAddTagService')
  private readonly projectAddTagService: IProjectAddTagService;

  @Inject('IProjectAddTeamUserService')
  private readonly projectAddTeamUserService: IProjectAddTeamUserService;

  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<IProjectEntity> {
    return await this.projectCreateService.handle(createProjectDto);
  }

  @Post('tags')
  async addTag(@Body() projectTagDto: ProjectTagDto): Promise<IProjectEntity> {
    return await this.projectAddTagService.handle(projectTagDto);
  }

  @Post('team-users')
  async addTeamUser(
    @Body() projectTeamUserDto: ProjectTeamUserDto,
  ): Promise<IProjectEntity> {
    return await this.projectAddTeamUserService.handle(projectTeamUserDto);
  }
}
