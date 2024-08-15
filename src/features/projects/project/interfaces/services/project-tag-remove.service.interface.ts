import { ProjectTagDto } from '@/features/projects/project/presentation/dto/project-tag.dto';

export interface IProjectTagRemoveService {
  handle(projectTagDto: ProjectTagDto): Promise<void>;
}
