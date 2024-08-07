import { RedisOptions } from 'ioredis';

export interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}
