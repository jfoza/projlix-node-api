import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { UpdateProjectDto } from '@/features/projects/project/presentation/dto/update-project.dto';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';

export interface IProjectRepository {
  findAll(
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator>;
  findAllWithoutFilters(): Promise<IProjectEntity[]>;
  findByIds(ids: string[]): Promise<IProjectEntity[]>;
  findById(id: string): Promise<IProjectEntity>;
  findByName(name: string): Promise<IProjectEntity>;
  findByUniqueName(uniqueName: string): Promise<IProjectEntity>;
  create(createProjectDto: CreateProjectDto): Promise<IProjectEntity>;
  update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<IProjectEntity>;
  remove(id: string): Promise<void>;
}
