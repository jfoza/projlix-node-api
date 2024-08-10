import { ITagRepository } from '@/features/general/tags/interfaces/repositories/tag.repository.interface';
import { ITagEntity } from '@/features/general/tags/interfaces/entities/tag.entity';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class TagValidations {
  static async tagExists(id: string, tagRepository: ITagRepository) {
    const tag: ITagEntity = await tagRepository.findById(id);

    if (!tag) {
      throw new NotFoundException(ErrorMessagesEnum.TAG_NOT_FOUND);
    }

    return tag;
  }
}
