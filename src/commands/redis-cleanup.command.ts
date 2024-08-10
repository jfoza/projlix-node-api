import { Command, CommandRunner } from 'nest-commander';
import { RedisService } from '@/redis/presentation/services/redis.service';

@Command({ name: 'redis:cleanup', description: 'Redis cleanup' })
export class RedisCleanupCommand extends CommandRunner {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async run(): Promise<void> {
    await this.redisService.flushAll();
    console.log('Redis cleanup performed.');
  }
}
