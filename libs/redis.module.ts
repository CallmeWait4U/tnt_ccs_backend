import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Inject, Injectable, Module } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class RedisImplement {
  constructor(@Inject(CACHE_MANAGER) private redis: Cache) {}

  async saveSession(token: string, sid: string): Promise<void> {
    const existing = await this.redis.get(token);
    if (!existing) {
      await this.redis.set(token, JSON.stringify([sid]), {
        ttl: 60 * 60 * 24,
      } as any);
    } else {
      const sids: string[] = JSON.parse(existing as string);
      sids.push(sid);
      await this.redis.set(token, JSON.stringify(sids), {
        ttl: 60 * 60 * 24,
      } as any);
    }
  }

  async getClients(token: string): Promise<string[]> {
    const existing = await this.redis.get(token);
    if (!existing) {
      //throw new HttpException('User is not online', HttpStatus.GATEWAY_TIMEOUT);
      return [];
    }
    return JSON.parse(existing as string) as string[];
  }

  async reset() {
    await this.redis.reset();
  }

  async deleteSession(token: string, sid: string): Promise<void> {
    const sids: string[] = JSON.parse(await this.redis.get(token));
    const index = sids.indexOf(sid);
    if (index > -1) sids.splice(index, 1);
    if (sids.length > 0) {
      await this.redis.set(token, JSON.stringify(sids));
    } else {
      await this.redis.del(token);
    }
  }
}

@Module({
  imports: [
    CacheModule.register({
      useFactory: async () => ({
        store: redisStore,
        host: 'redis-11608.c8.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 11608,
        isGlobal: true,
      }),
    }),
  ],
  providers: [RedisImplement],
  exports: [RedisImplement],
})
export class RedisModule {}
