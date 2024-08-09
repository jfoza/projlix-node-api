import { IColorListByIdService } from '@/features/general/colors/interfaces/services/color-list-by-id.service.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class ColorListByIdService
  extends Service
  implements IColorListByIdService
{
  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  async handle(id: string): Promise<IColorEntity> {
    this.getPolicy().can(RulesEnum.COLORS_VIEW);

    const color: IColorEntity = await this.colorRepository.findById(id);

    if (!color) {
      throw new NotFoundException(ErrorMessagesEnum.COLOR_NOT_FOUND);
    }

    return color;
  }
}
