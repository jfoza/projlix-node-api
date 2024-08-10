import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { UpdateTagDto } from '@/features/general/tags/presentation/dto/update-tag.dto';

export interface ITagUpdateService {
  handle(id: string, updateTagDto: UpdateTagDto): Promise<ITagEntity>;
}
