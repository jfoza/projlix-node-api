import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { CreateTagDto } from '@/features/general/tags/presentation/dto/create-tag.dto';

export interface ITagCreateService {
  handle(createTagDto: CreateTagDto): Promise<ITagEntity>;
}
