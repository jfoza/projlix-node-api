import { IProjectCreateService } from '@/features/projects/project/interfaces/services/project-create.service.interface';
import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';

@Injectable()
export class ProjectCreateService
  extends Service
  implements IProjectCreateService
{
  async handle(createProjectDto: CreateProjectDto): Promise<IProjectEntity> {
    return Promise.resolve(undefined);
  }
}
