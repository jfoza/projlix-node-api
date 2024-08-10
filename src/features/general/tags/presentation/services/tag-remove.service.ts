import { ITagRemoveService } from '@/features/general/tags/interfaces/services/tag-remove.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { Service } from '@/common/presentation/services/service';

@Injectable()
export class TagRemoveService extends Service implements ITagRemoveService {
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(id: string): Promise<void> {
    const tag: ITagEntity = await TagValidations.tagExists(
      id,
      this.tagRepository,
    );

    await this.tagRepository.remove(tag);
  }
}
