import { IColorListByIdService } from '@/features/general/colors/interfaces/services/color-list-by-id.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { ColorValidations } from '@/features/general/colors/application/validations/color.validations';

@Injectable()
export class ColorListByIdService
  extends Service
  implements IColorListByIdService
{
  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  async handle(id: string): Promise<IColorEntity> {
    this.getPolicy().can(RulesEnum.COLORS_VIEW);

    return await ColorValidations.colorExists(id, this.colorRepository);
  }
}
