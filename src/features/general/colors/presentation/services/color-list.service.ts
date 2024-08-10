import { IColorListService } from '@/features/general/colors/interfaces/services/color-list.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IColorEntity } from '@/features/general/colors/interfaces/entities/color.entity.interface';
import { IColorRepository } from '@/features/general/colors/interfaces/repositories/color.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { RedisService } from '@/redis/presentation/services/redis.service';
import { CacheEnum } from '@/common/enums/cache.enum';

@Injectable()
export class ColorListService extends Service implements IColorListService {
  @Inject('IColorRepository')
  private readonly colorRepository: IColorRepository;

  @Inject(RedisService)
  private readonly redis: RedisService;

  async handle(): Promise<IColorEntity[]> {
    this.getPolicy().can(RulesEnum.COLORS_VIEW);

    return await this.redis.remember(CacheEnum.COLORS, () => {
      return this.colorRepository.findAll();
    });
  }
}
