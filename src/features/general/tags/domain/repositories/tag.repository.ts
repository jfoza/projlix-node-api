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

  async findAll(
    tagFiltersDto: TagFiltersDto,
  ): Promise<ITagEntity[] | ILengthAwarePaginator> {
    const qb = this.repository
      .createQueryBuilder('tag')
      .when(tagFiltersDto.name, (qb) =>
        qb.andWhere('tag.name ILIKE :name', {
          name: `%${tagFiltersDto.name}%`,
        }),
      )
      .when(
        tagFiltersDto.columnName,
        (qb) =>
          qb.orderBy(
            `tag.${tagFiltersDto.columnName}`,
            tagFiltersDto.columnOrder,
          ),
        (qb) => qb.orderBy('tag.created_at', 'DESC'),
      );

    if (tagFiltersDto.page) {
      return await paginate(qb, {
        page: tagFiltersDto.page,
        perPage: tagFiltersDto.perPage,
      });
    }

    return await qb.getMany();
  }

  async findById(id: string): Promise<ITagEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: ['color', 'projects'],
    });
  }

  async create(createTagDto: CreateTagDto): Promise<ITagEntity> {
    const tag: ITagEntity = this.repository.create({
      name: createTagDto.name,
      color_id: createTagDto.color,
    });

    return await this.repository.save(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<ITagEntity> {
    const tag: ITagEntity = await this.repository.preload({
      ...{
        color_id: updateTagDto.color,
        name: updateTagDto.name,
      },
      id,
    });

    return await this.repository.save(tag);
  }

  async updateStatus(tagId: string, newStatus: boolean): Promise<void> {
    await this.repository.update(tagId, { active: newStatus });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
