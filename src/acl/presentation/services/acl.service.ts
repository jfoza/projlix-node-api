import { Inject, Injectable } from '@nestjs/common';
import { Policy } from '@/acl/types/policy';
import { IRuleRepository } from '@/users/rule/interfaces/repositories/rule.repository.interface';
import { AuthService } from '@/jwt/auth.service';
import { RedisService } from '@/redis/presentation/services/redis.service';
import { CacheEnum } from '@/shared/enums/cache.enum';

@Injectable()
export class AclService {
  @Inject('IRuleRepository')
  private readonly ruleRepository: IRuleRepository;

  @Inject(AuthService)
  private readonly authService: AuthService;

  @Inject(RedisService)
  private readonly redis: RedisService;

  async handle(): Promise<Policy> {
    const userId = this.authService.getUser().id;

    let rules: string[];

    if (userId) {
      const redisKey: string = CacheEnum.ABILITY_USER(userId);

      rules = await this.redis.remember(redisKey, () => {
        return this.ruleRepository.getUserRuleDescriptions(
          this.authService.getUser().id,
        );
      });
    }

    return new Policy(rules);
  }

  async invalidate(userId: string): Promise<void> {
    await this.redis.invalidate(CacheEnum.ABILITY_USER(userId));
  }

  async invalidateAll(): Promise<void> {
    await this.redis.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
  }
}
