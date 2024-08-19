import { ITagUpdateStatusService } from '@/features/general/tags/interfaces/services/tag-update-status.service.interface';
import { ITagUpdateStatus } from '@/features/general/tags/interfaces/responses/tag-update-status.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { Service } from '@/common/presentation/services/service';
import { TagValidations } from '@/features/general/tags/application/validations/tag.validations';
import { Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';

@Injectable()
export class TagUpdateStatusService
  extends Service
  implements ITagUpdateStatusService
{
  @Inject('ITagRepository')
  private readonly tagRepository: ITagRepository;

  async handle(id: string): Promise<ITagUpdateStatus> {
    this.getPolicy().can(RulesEnum.TAGS_UPDATE);

    const tag = await TagValidations.tagExists(id, this.tagRepository);

    const newStatus = !tag.active;

    await this.tagRepository.updateStatus(tag.id, newStatus);

    return { tag_id: tag.id, active: newStatus };
  }
}
