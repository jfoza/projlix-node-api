import { IColorListService } from '@/features/general/colors/interfaces/services/color-list.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';

@Injectable()
export class ColorListService extends Service implements IColorListService {
  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  async handle(): Promise<IColorEntity[]> {
    this.getPolicy().can(RulesEnum.COLORS_VIEW);

    return await this.colorRepository.findAll();
  }
}
