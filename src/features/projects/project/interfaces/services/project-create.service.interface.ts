import { CreateProjectDto } from '@/features/projects/project/presentation/dto/create-project.dto';
import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export interface IProjectCreateService {
  handle(createProjectDto: CreateProjectDto): Promise<IProjectEntity>;
}
