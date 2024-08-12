import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { UpdateProjectDto } from '@/features/projects/project/presentation/dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProjectEntity } from '@/features/projects/project/domain/entities/project.entity';
import { ProjectFiltersDto } from '@/features/projects/project/presentation/dto/project-filters.dto';
import { paginate } from '@/common/domain/pagination';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  @InjectRepository(ProjectEntity)
  private readonly repository: Repository<ProjectEntity>;

  async create(createProjectDto: CreateProjectDto): Promise<IProjectEntity> {
    const project = this.repository.create(createProjectDto);

    return await this.repository.save(project);
  }

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

  async findById(id: string): Promise<IProjectEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: ['tags.color', 'icon'],
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

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<IProjectEntity> {
    const project: ProjectEntity = await this.repository.preload({
      ...{
        name: updateProjectDto.name,
        unique_name: updateProjectDto.unique_name,
        description: updateProjectDto.description,
      },
      id,
    });

    return await this.repository.save(project);
  }
}
