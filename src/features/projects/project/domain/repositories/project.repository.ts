import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';
import { paginate } from '@/common/domain/pagination';
import { Injectable } from '@nestjs/common';
import { ProjectIconDto } from '@/features/projects/project/presentation/dto/project-icon.dto';
import { ProjectInfoUpdateDto } from '@/features/projects/project/presentation/dto/project-info-update.dto';
import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { ProjectTeamUserDto } from '@/features/projects/project/presentation/dto/project-team-user.dto';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  @InjectRepository(ProjectEntity)
  private readonly repository: Repository<ProjectEntity>;

  async findAll(
    projectFiltersDto: ProjectFiltersDto,
  ): Promise<IProjectEntity[] | ILengthAwarePaginator> {
    const queryBuilder = this.repository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.icon', 'icon')
      .when(projectFiltersDto.title, (qb, title) =>
        qb.andWhere('project.title ILIKE :title', { title: `%${title}%` }),
      )
      .when(projectFiltersDto.projectsId, (qb, projectsId) =>
        qb.andWhere('project.id IN (:...projectsId)', { projectsId }),
      );

    if (projectFiltersDto.page) {
      return await paginate(queryBuilder, {
        page: projectFiltersDto.page,
        perPage: projectFiltersDto.perPage,
      });
    }

    return await queryBuilder.getMany();
  }

  async findAllWithoutFilters(): Promise<IProjectEntity[]> {
    return await this.repository.find();
  }

  async findById(
    id: string,
    relations: string[] = [],
  ): Promise<IProjectEntity> {
    return await this.repository.findOne({
      where: { id },
      relations,
    });
  }

  async findByIds(ids: string[]): Promise<IProjectEntity[]> {
    return await this.repository.find({
      where: { id: In(ids) },
    });
  }

  async findByName(name: string): Promise<IProjectEntity> {
    return await this.repository.findOne({
      where: { name },
    });
  }

  async findByUniqueName(uniqueName: string): Promise<IProjectEntity> {
    return await this.repository.findOne({
      where: { unique_name: uniqueName },
    });
  }

  async create(createProjectDto: CreateProjectDto): Promise<IProjectEntity> {
    const project = this.repository.create({
      icon_id: createProjectDto.iconId,
      name: createProjectDto.name,
      description: createProjectDto.description,
      unique_name: createProjectDto.uniqueName,
    });

    return await this.repository.save(project);
  }

  async saveTagsRelation(
    project: IProjectEntity,
    tagsId: string[],
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .relation(ProjectEntity, 'tags')
      .of(project.id)
      .add(tagsId);
  }

  async updateInfo(
    id: string,
    projectInfoUpdateDto: ProjectInfoUpdateDto,
  ): Promise<IProjectEntity> {
    const project: ProjectEntity = await this.repository.preload({
      ...{
        name: projectInfoUpdateDto.name,
        unique_name: projectInfoUpdateDto.uniqueName,
        description: projectInfoUpdateDto.description,
      },
      id,
    });

    return await this.repository.save(project);
  }

  async updateIcon(
    id: string,
    projectIconDto: ProjectIconDto,
  ): Promise<IProjectEntity> {
    const project: ProjectEntity = await this.repository.preload({
      ...{
        icon_id: projectIconDto.iconId,
      },
      id,
    });

    return await this.repository.save(project);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async removeTagRelation(projectTagDto: ProjectTagDto): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .relation(ProjectEntity, 'tags')
      .of(projectTagDto.projectId)
      .remove(projectTagDto.tagId);
  }

  async removeTeamUserRelation(
    projectTeamUserDto: ProjectTeamUserDto,
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .relation(ProjectEntity, 'team_users')
      .of(projectTeamUserDto.projectId)
      .remove(projectTeamUserDto.teamUserId);
  }
}
