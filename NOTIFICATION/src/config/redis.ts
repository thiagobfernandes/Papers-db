import { createClient } from 'redis';
import { Logger } from '../shared/helpers/logger';
import { appConfig } from '../shared/schemas/app-config-env';

const config = appConfig.loadConfig();
let redisClient: ReturnType<typeof createClient> | null = null;

export async function initializeRedis() {
 redisClient = createClient({
  socket: {
    host: config.REDIS_HOST,
    port: 6379
  },
  password: config.REDIS_PASSWORD,
});

  redisClient.on('error', (err) => {
    Logger.error(`Redis Client Error: ${err}`);
  });

  redisClient.on('connect', () => {
    Logger.info('Conectado ao Redis');
  });

  await redisClient.connect();
  return redisClient;
}

export function getRedisClient() {
  if (!redisClient) {
    throw new Error('Redis não foi inicializado.');
  }
  return redisClient;
}
