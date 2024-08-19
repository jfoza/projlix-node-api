import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { IProjectListByUniqueNameUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-unique-name.use-case.interface';

@Injectable()
export class ProjectListByUniqueNameUseCase
  implements IProjectListByUniqueNameUseCase
{
  private uniqueName: string;
  private relations: string[];

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  setUniqueName(uniqueName: string): this {
    this.uniqueName = uniqueName;
    return this;
  }

  setRelations(relations: string[]): this {
    this.relations = relations;
    return this;
  }

  async execute(): Promise<IProjectEntity> {
    const project: IProjectEntity =
      await this.projectRepository.findByUniqueName(
        this.uniqueName,
        this.relations,
      );

    if (!project) {
      throw new NotFoundException(ErrorMessagesEnum.PROJECT_NOT_FOUND);
    }

    return project;
  }
}
