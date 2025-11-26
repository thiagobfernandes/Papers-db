import { getRedisClient } from "../../config/redis";
import { Logger } from "../helpers/logger";

export interface PublisherServiceInterface {
  publish(channel: string, message: any): Promise<void>;
}

export class PublisherService implements PublisherServiceInterface {
  async publish(channel: string, message: any): Promise<void> {
    try {
      const client = getRedisClient();
      const payload = JSON.stringify(message);

      await client.publish(channel, payload);

      Logger.info(`Redis PUBLISH: canal="${channel}" payload=${payload}`);
    } catch (error) {
      Logger.warn(`Erro ao publicar mensagem no canal "${channel}": ${error}`);
    }
  }
}
