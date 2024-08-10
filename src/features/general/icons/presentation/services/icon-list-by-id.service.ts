import { IIconListByIdService } from '@/features/general/icons/interfaces/services/icon-list-by-id.service.interface';
import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { Service } from '@/common/presentation/services/service';
import { ErrorMessagesEnum } from '@/common/enums/error-messages.enum';

@Injectable()
export class IconListByIdService
  extends Service
  implements IIconListByIdService
{
  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  async handle(id: string): Promise<IIconEntity> {
    this.getPolicy().can(RulesEnum.ICONS_VIEW);

    const icon: IIconEntity = await this.iconRepository.findById(id);

    if (!icon) {
      throw new NotFoundException(ErrorMessagesEnum.ICON_NOT_FOUND);
    }

    return icon;
  }
}
