import { ISectionEntity } from '@/features/projects/section/interfaces/entities/section.entity.interface';
import { ISectionRepository } from '@/features/projects/section/interfaces/repositories/section.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class SectionValidations {
  static async sectionExists(
    id: string,
    sectionRepository: ISectionRepository,
  ): Promise<ISectionEntity> {
    const section = await sectionRepository.findById(id);

    if (!section) {
      throw new NotFoundException(ErrorMessagesEnum.SECTION_NOT_FOUND);
    }

    return section;
  }
}
