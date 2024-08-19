import { ProjectIconDto } from '@/features/projects/project/presentation/dto/project-icon.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export interface IProjectIconUpdateService {
  handle(id: string, projectIconDto: ProjectIconDto): Promise<IProjectEntity>;
}
