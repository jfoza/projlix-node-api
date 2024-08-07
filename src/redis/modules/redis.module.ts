import { Global, Module } from '@nestjs/common';
import { RedisService } from '@/redis/presentation/services/redis.service';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: RedisService,
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        const redisPassword = configService.get<string>('REDIS_PASS');

        const redisClient = new Redis({
          host: redisHost,
          port: redisPort,
          password: redisPassword,
        });

        return new RedisService(redisClient);
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
