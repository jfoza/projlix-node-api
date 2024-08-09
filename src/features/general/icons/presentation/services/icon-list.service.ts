import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { IIconListService } from '@/features/general/icons/interfaces/services/icon-list.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class IconListService extends Service implements IIconListService {
  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  async handle(): Promise<IIconEntity[]> {
    this.getPolicy().can(RulesEnum.ICONS_VIEW);

    return await this.iconRepository.findAll();
  }
}
