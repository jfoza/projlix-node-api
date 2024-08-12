import { Inject, Injectable } from '@nestjs/common';
import { Policy } from '@/acl/types/policy';
import { RedisService } from '@/redis/presentation/services/redis.service';
import { JwtInfoService } from '@/jwt/presentation/services/jwt-info.service';
import { IRuleRepository } from '@/features/users/rule/interfaces/repositories/rule.repository.interface';
import { CacheEnum } from '@/common/enums/cache.enum';

@Injectable()
export class AclService {
  @Inject('IRuleRepository')
  private readonly ruleRepository: IRuleRepository;

  @Inject(JwtInfoService)
  private readonly jwtInfoService: JwtInfoService;

  @Inject(RedisService)
  private readonly redis: RedisService;

  async handle(): Promise<Policy> {
    if (this.jwtInfoService.getUser()) {
      const userId = this.jwtInfoService.getUser().id;

      let rules: string[];

      if (userId) {
        const redisKey: string = CacheEnum.ABILITY_USER(userId);

        rules = await this.redis.remember(
          redisKey,
          () => {
            return this.ruleRepository.getUserRuleDescriptions(userId);
          },
          604800,
        );
      }

      return new Policy(rules);
    }

    return new Policy([]);
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.invalidate(CacheEnum.ABILITY_USER(userId));
  }

  async invalidateAll(): Promise<void> {
    await this.redis.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
  }
}
