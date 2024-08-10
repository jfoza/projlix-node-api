import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { CreateTagDto } from '@/features/general/tags/presentation/dto/create-tag.dto';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { UpdateTagDto } from '@/features/general/tags/presentation/dto/update-tag.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '@/features/general/tags/domain/entities/tag.entity';
import { TagFiltersDto } from '@/features/general/tags/presentation/dto/tag-filters.dto';
import { paginate } from '@/common/domain/pagination';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';

@Injectable()
export class TagRepository implements ITagRepository {
  @InjectRepository(TagEntity)
  private readonly repository: Repository<TagEntity>;

  async crate(createTagDto: CreateTagDto): Promise<ITagEntity> {
    const tag: ITagEntity = this.repository.create(createTagDto);

    return await this.repository.save(tag);
  }

  async findAll(
    tagFiltersDto: TagFiltersDto,
  ): Promise<ITagEntity[] | ILengthAwarePaginator> {
    if (tagFiltersDto.page) {
      const qb = this.repository.createQueryBuilder('tag');

      return await paginate(qb, {
        page: tagFiltersDto.page,
        perPage: tagFiltersDto.perPage,
      });
    }

    return await this.repository.find();
  }

  async findById(id: string): Promise<ITagEntity> {
    return await this.repository.findOne({ where: { id } });
  }

  async remove(tag: ITagEntity): Promise<void> {
    await this.repository.remove(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<ITagEntity> {
    const tag: ITagEntity = await this.repository.preload({
      ...{
        color_id: updateTagDto.color_id,
        name: updateTagDto.name,
      },
      id,
    });

    return await this.repository.save(tag);
  }
}
