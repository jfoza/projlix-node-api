import {
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { AuthGuard } from '@/features/auth/config/auth.guard';
import { IProjectIconUpdateService } from '@/features/projects/project/interfaces/services/project-icon-update.service.interface';
import { ProjectIconDto } from '@/features/projects/project/presentation/dto/project-icon.dto';
import { IProjectInfoUpdateService } from '@/features/projects/project/interfaces/services/project-info-update.service.interface';
import { ProjectInfoUpdateDto } from '@/features/projects/project/presentation/dto/project-info-update.dto';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectUpdateController {
  @Inject('IProjectInfoUpdateService')
  private readonly projectInfoUpdateService: IProjectInfoUpdateService;

  @Inject('IProjectIconUpdateService')
  private readonly projectIconUpdateService: IProjectIconUpdateService;

  @Put(':id/info')
  async updateInfo(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() projectInfoUpdateDto: ProjectInfoUpdateDto,
  ): Promise<IProjectEntity> {
    return await this.projectInfoUpdateService.handle(id, projectInfoUpdateDto);
  }

  @Put(':id/icon')
  async updateIcon(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() projectIconDto: ProjectIconDto,
  ): Promise<IProjectEntity> {
    return await this.projectIconUpdateService.handle(id, projectIconDto);
  }
}
