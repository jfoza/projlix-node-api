import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';
import { ProjectInfoUpdateDto } from '@/features/projects/project/presentation/dto/project-info-update.dto';

export interface IProjectInfoUpdateService {
  handle(
    id: string,
    projectInfoUpdateDto: ProjectInfoUpdateDto,
  ): Promise<IProjectEntity>;
}
