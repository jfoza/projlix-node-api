import { ITagUpdateService } from '@/features/general/tags/interfaces/services/tag-update.service.interface';
import { UpdateTagDto } from '@/features/general/tags/presentation/dto/update-tag.dto';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { ColorValidations } from '@/features/general/colors/application/validations/color.validations';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { Service } from '@/common/presentation/services/service';

@Injectable()
export class TagUpdateService extends Service implements ITagUpdateService {
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  async handle(id: string, updateTagDto: UpdateTagDto): Promise<ITagEntity> {
    await TagValidations.tagExists(id, this.tagRepository);

    await ColorValidations.colorExists(
      updateTagDto.color_id,
      this.colorRepository,
    );

    return this.tagRepository.update(id, updateTagDto);
  }
}
