import { ITagListByIdService } from '@/features/general/tags/interfaces/services/tag-list-by-id.service.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { Inject, Injectable } from '@nestjs/common';
import { Service } from '@/common/presentation/services/service';

@Injectable()
export class TagListByIdService extends Service implements ITagListByIdService {
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(id: string): Promise<ITagEntity> {
    return await TagValidations.tagExists(id, this.tagRepository);
  }
}
