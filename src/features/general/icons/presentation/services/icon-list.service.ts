import { IIconEntity } from '@/features/general/icons/interfaces/entities/icon.entity.interface';
import { IIconListService } from '@/features/general/icons/interfaces/services/icon-list.service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IIconRepository } from '@/features/general/icons/interfaces/repositories/icon.repository.interface';
import { Service } from '@/common/presentation/services/service';
import { RulesEnum } from '@/common/enums/rules.enum';
import { CacheEnum } from '@/common/enums/cache.enum';
import { RedisService } from '@/redis/presentation/services/redis.service';

@Injectable()
export class IconListService extends Service implements IIconListService {
  @Inject('IIconRepository')
  private readonly iconRepository: IIconRepository;

  @Inject(RedisService)
  private readonly redis: RedisService;

  async handle(): Promise<IIconEntity[]> {
    this.getPolicy().can(RulesEnum.ICONS_VIEW);

    return await this.redis.remember(CacheEnum.ICONS, () => {
      return this.iconRepository.findAll();
    });
  }
}
