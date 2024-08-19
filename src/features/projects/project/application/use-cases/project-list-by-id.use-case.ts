import { IProjectListByIdUseCase } from '@/features/projects/project/interfaces/use-cases/project-list-by-id.use-case.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';

@Injectable()
export class ProjectListByIdUseCase implements IProjectListByIdUseCase {
  private id: string;
  private relations: string[];

  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  setId(id: string): this {
    this.id = id;
    return this;
  }

  setRelations(relations: string[]): this {
    this.relations = relations;
    return this;
  }

  async execute(): Promise<IProjectEntity> {
    const project: IProjectEntity = await this.projectRepository.findById(
      this.id,
      this.relations,
    );

    if (!project) {
      throw new NotFoundException(ErrorMessagesEnum.PROJECT_NOT_FOUND);
    }

    return project;
  }
}
