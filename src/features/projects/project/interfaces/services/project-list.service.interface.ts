import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';

export interface IProjectListService {
  handle(
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator>;
}
