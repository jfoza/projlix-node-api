import { IProjectEntity } from '@/features/projects/project/interfaces/entities/project.entity.interface';

export interface IProjectListByUniqueNameUseCase {
  setUniqueName(id: string): this;
  setRelations(relations: string[]): this;
  execute(): Promise<IProjectEntity>;
}
