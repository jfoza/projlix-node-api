import { ITagRemoveService } from '@/features/general/tags/interfaces/services/tag-remove.service.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

@Injectable()
export class TagRemoveService extends Service implements ITagRemoveService {
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(id: string): Promise<void> {
    this.getPolicy().can(RulesEnum.TAGS_DELETE);

    const tag = await TagValidations.tagExists(id, this.tagRepository);

    if (tag.projects.length > 0) {
      throw new BadRequestException(
        ErrorMessagesEnum.TAG_HAS_PROJECTS_IN_DELETE,
      );
    }

    await this.tagRepository.remove(id);
  }
}
