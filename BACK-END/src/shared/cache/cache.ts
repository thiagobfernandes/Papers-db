import { getRedisClient } from "../../config/redis";
import { Logger } from "../helpers/logger";

export interface CacheServiceInterface {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  delMultiple(keys: string[]): Promise<void>;
}

export class CacheService implements CacheServiceInterface {
  private readonly DEFAULT_TTL = 30; 

  async get<T>(key: string): Promise<T | null> {
    try {
      const client = getRedisClient();
      const cached = await client.get(key);
      
      if (cached) {
        Logger.info(`Cache HIT: ${key}`);
        return JSON.parse(cached) as T;
      }
      
      Logger.info(`Cache MISS: ${key}`);
      return null;
    } catch (error) {
      Logger.warn(`Erro ao buscar cache para ${key}: ${error}`);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const client = getRedisClient();
      const expireTime = ttl || this.DEFAULT_TTL;
      
      await client.set(key, JSON.stringify(value), { EX: expireTime });
      Logger.info(`Cache SAVED: ${key} (TTL: ${expireTime}s)`);
    } catch (error) {
      Logger.warn(`Erro ao salvar cache para ${key}: ${error}`);
    }
  }

  async del(key: string): Promise<void> {
    try {
      const client = getRedisClient();
      await client.del(key);
      Logger.info(`Cache DELETED: ${key}`);
    } catch (error) {
      Logger.warn(`Erro ao deletar cache para ${key}: ${error}`);
    }
  }

  async delMultiple(keys: string[]): Promise<void> {
    try {
      if (keys.length === 0) return;
      
      const client = getRedisClient();
      await client.del(keys);
      Logger.info(`Cache DELETED: ${keys.length} chaves`);
    } catch (error) {
      Logger.warn(`Erro ao deletar múltiplos caches: ${error}`);
    }
  }
}
