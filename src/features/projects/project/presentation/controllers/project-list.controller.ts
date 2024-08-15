import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { IProjectListService } from '@/features/projects/project/interfaces/services/project-list.service.interface';
import { IProjectListByIdService } from '@/features/projects/project/interfaces/services/project-list-by-id.service.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';
import { AuthGuard } from '@/features/auth/config/auth.guard';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectListController {
  @Inject('IProjectListService')
  private readonly projectListService: IProjectListService;

  @Inject('IProjectListByIdService')
  private readonly projectListByIdService: IProjectListByIdService;

  @Get()
  async findAll(
    @Query() projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator> {
    return await this.projectListService.handle(projectFiltersDto);
  }

  @Get(':id')
  findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<IProjectEntity> {
    return this.projectListByIdService.handle(id);
  }
}
