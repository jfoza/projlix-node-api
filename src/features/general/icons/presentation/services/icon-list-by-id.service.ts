import { IIconListByIdService } from '@/features/general/icons/interfaces/services/icon-list-by-id.service.interface';
import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { RulesEnum } from '@/common/enums/rules.enum';
import { Service } from '@/common/presentation/services/service';
import { IconValidations } from '@/features/general/icons/application/validations/icon.validations';

@Injectable()
export class IconListByIdService
  extends Service
  implements IIconListByIdService
{
  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  async handle(id: string): Promise<IIconEntity> {
    this.getPolicy().can(RulesEnum.ICONS_VIEW);

    return await IconValidations.iconExists(id, this.iconRepository);
  }
}
