import { Injectable } from '@nestjs/common';
import { Redis as RedisClient } from 'ioredis';

@Injectable()
export class RedisService {
  private client: RedisClient;

  constructor(client: RedisClient) {
    this.client = client;
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async remember<T>(key: string, fn: () => Promise<T>): Promise<T> {
    let value = await this.recover<T>(key);

    if (!value) {
      value = await fn();
      await this.save(key, value);
    }

    return value;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidateByPattern(pattern: string): Promise<void> {
    this.client.keys(pattern, (err, keys) => {
      if (err) throw err;

      if (keys.length > 0) {
        this.client.del(keys, (err) => {
          if (err) throw err;
        });
      }
    });
  }
}
