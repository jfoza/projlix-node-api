import { ITagListService } from '@/features/general/tags/interfaces/services/tag-list.service.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { TagFiltersDto } from '@/features/general/tags/presentation/dto/tag-filters.dto';
import { ILengthAwarePaginator } from '@/common/interfaces/length-aware-paginator.interface';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class TagListService extends Service implements ITagListService {
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(
    tagFiltersDto: TagFiltersDto,
  ): Promise<ITagEntity[] | ILengthAwarePaginator> {
    this.getPolicy().can(RulesEnum.TAGS_VIEW);

    return await this.tagRepository.findAll(tagFiltersDto);
  }
}
