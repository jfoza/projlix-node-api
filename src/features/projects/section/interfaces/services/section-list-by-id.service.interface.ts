import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';

export interface ISectionListByIdService {
  handle(id: string): Promise<ISectionEntity>;
}
