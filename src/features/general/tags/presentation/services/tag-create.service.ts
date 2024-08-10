import { ITagCreateService } from '@/features/general/tags/interfaces/services/tag-create.service.interface';
import { CreateTagDto } from '@/features/general/tags/presentation/dto/create-tag.dto';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { ColorValidations } from '@/features/general/colors/application/validations/color.validations';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class TagCreateService extends Service implements ITagCreateService {
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  async handle(createTagDto: CreateTagDto): Promise<ITagEntity> {
    this.getPolicy().can(RulesEnum.TAGS_INSERT);

    await ColorValidations.colorExists(
      createTagDto.color_id,
      this.colorRepository,
    );

    return await this.tagRepository.crate(createTagDto);
  }
}
