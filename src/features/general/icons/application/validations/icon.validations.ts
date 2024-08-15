import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';

export class IconValidations {
  static async iconExists(id: string, iconRepository: IIconRepository) {
    const icon: IIconEntity = await iconRepository.findById(id);

    if (!icon) {
      throw new NotFoundException(ErrorMessagesEnum.ICON_NOT_FOUND);
    }

    return icon;
  }
}
