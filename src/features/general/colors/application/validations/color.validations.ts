import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

export class ColorValidations {
  static async colorExists(
    id: string,
    colorRepository: IColorRepository,
  ): Promise<IColorEntity> {
    const color: IColorEntity = await colorRepository.findById(id);

    if (!color) {
      throw new NotFoundException(ErrorMessagesEnum.COLOR_NOT_FOUND);
    }

    return color;
  }
}
