import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export class ProjectValidations {
  static async projectExists(
    id: string,
    projectRepository: IProjectRepository,
  ): Promise<IProjectEntity> {
    const project: IProjectEntity = await projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(ErrorMessagesEnum.PROJECT_NOT_FOUND);
    }

    return project;
  }

  static async projectsExists(
    projectsId: string[],
    projectRepository: IProjectRepository,
  ): Promise<IProjectEntity[]> {
    const projects: IProjectEntity[] =
      await projectRepository.findByIds(projectsId);

    const ids: string[] = projects.map((project: IProjectEntity) => project.id);

    for (const projectId of projectsId) {
      if (!ids.includes(projectId)) {
        throw new NotFoundException(ErrorMessagesEnum.PROJECT_NOT_FOUND);
      }
    }

    return projects;
  }

  static async projectExistsByName(
    name: string,
    projectRepository: IProjectRepository,
  ): Promise<void> {
    const project: IProjectEntity = await projectRepository.findByName(name);

    if (project) {
      throw new NotFoundException(
        ErrorMessagesEnum.REGISTER_NAME_ALREADY_EXISTS,
      );
    }
  }
}
