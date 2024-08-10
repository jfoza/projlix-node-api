import { Module } from '@nestjs/common';
import { RedisCleanupCommand } from '@/commands/redis-cleanup.command';

@Module({
  providers: [RedisCleanupCommand],
  exports: [RedisCleanupCommand],
})
export class CommandsModule {}
