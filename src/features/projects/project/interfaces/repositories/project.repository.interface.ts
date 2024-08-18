import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';
import { ProjectIconDto } from '@/features/projects/project/presentation/dto/project-icon.dto';
import { ProjectInfoUpdateDto } from '@/features/projects/project/presentation/dto/project-info-update.dto';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';

export interface IProjectRepository {
  findAll(
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator>;
  findAllWithoutFilters(): Promise<IProjectEntity[]>;
  findByIds(ids: string[]): Promise<IProjectEntity[]>;
  findById(id: string, relations: string[]): Promise<IProjectEntity>;
  findByName(name: string): Promise<IProjectEntity>;
  findByUniqueName(uniqueName: string): Promise<IProjectEntity>;
  create(createProjectDto: CreateProjectDto): Promise<IProjectEntity>;
  saveTagsRelation(project: IProjectEntity, tagsId: string[]): Promise<void>;
  updateInfo(
    id: string,
    projectInfoUpdateDto: ProjectInfoUpdateDto,
  ): Promise<IProjectEntity>;
  updateIcon(
    id: string,
    projectIconDto: ProjectIconDto,
  ): Promise<IProjectEntity>;
  remove(id: string): Promise<void>;
  removeTagRelation(projectTagDto: ProjectTagDto): Promise<void>;
  removeTeamUserRelation(projectTeamUserDto: ProjectTeamUserDto): Promise<void>;
}
