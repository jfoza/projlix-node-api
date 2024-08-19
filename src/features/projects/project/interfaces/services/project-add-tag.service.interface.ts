import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export interface IProjectAddTagService {
  handle(projectTagDto: ProjectTagDto): Promise<IProjectEntity>;
}
