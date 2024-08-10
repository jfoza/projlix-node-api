import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { CreateTagDto } from '@/features/general/tags/presentation/dto/create-tag.dto';
import { UpdateTagDto } from '@/features/general/tags/presentation/dto/update-tag.dto';
import { TagFiltersDto } from '@/features/general/tags/presentation/dto/tag-filters.dto';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';

export interface ITagRepository {
  findAll(
    tagFiltersDto: TagFiltersDto,
  ): Promise<ITagEntity[] | ILengthAwarePaginator>;
  findById(id: string): Promise<ITagEntity>;
  crate(createTagDto: CreateTagDto): Promise<ITagEntity>;
  update(id: string, updateTagDto: UpdateTagDto): Promise<ITagEntity>;
  remove(tag: ITagEntity): Promise<void>;
}
