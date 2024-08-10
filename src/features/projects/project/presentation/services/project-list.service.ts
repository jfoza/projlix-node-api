import { IProjectListService } from '@/features/projects/project/interfaces/services/project-list.service.interface';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';

@Injectable()
export class ProjectListService extends Service implements IProjectListService {
  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  handle(
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator> {
    return this.projectRepository.findAll(projectFiltersDto);
  }
}
