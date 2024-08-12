import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export interface IProjectListByIdService {
  handle(id: string): Promise<IProjectEntity>;
}
