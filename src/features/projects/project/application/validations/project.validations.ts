import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export class ProjectValidations {
  static async projectExists(
    id: string,
    projectRepository: IProjectRepository,
  ): Promise<IProjectEntity> {
    const project = await projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(ErrorMessagesEnum.PROJECT_NOT_FOUND);
    }

    return project;
  }
}
