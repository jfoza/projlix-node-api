import { IProjectListByIdService } from '@/features/projects/project/interfaces/services/project-list-by-id.service.interface';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';
import { IProjectRepository } from '@/features/projects/project/interfaces/repositories/project.repository.interface';
import { ProjectValidations } from '@/features/projects/project/application/validations/project.validations';

@Injectable()
export class ProjectListByIdService
  extends Service
  implements IProjectListByIdService
{
  @Inject('IProjectRepository')
  private readonly projectRepository: IProjectRepository;

  handle(id: string): Promise<IProjectEntity> {
    return ProjectValidations.projectExists(id, this.projectRepository);
  }
}
