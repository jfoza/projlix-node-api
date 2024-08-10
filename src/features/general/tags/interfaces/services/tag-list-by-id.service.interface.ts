import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';

export interface ITagListByIdService {
  handle(id: string): Promise<ITagEntity>;
}
