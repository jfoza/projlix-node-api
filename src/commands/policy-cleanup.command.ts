import { Command, CommandRunner } from 'nest-commander';
import { RedisService } from '@/redis/presentation/services/redis.service';
import { CacheEnum } from '@/common/enums/cache.enum';

@Command({ name: 'policy:cleanup', description: 'Policy cleanup' })
export class PolicyCleanupCommand extends CommandRunner {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async run(): Promise<void> {
    await this.redisService.invalidateByPattern(CacheEnum.ABILITY_USER('*'));
    console.log('Policy cleanup performed.');
  }
}
