import Joi from 'joi'
import { EnvDtoResult } from '../dtos/envDTO';
import * as dotenv from 'dotenv';
dotenv.config()


class AppConfigSchema {
  static env = Joi.object({

    NOTIFICATION_DATABASE_PORT: Joi.string().required(),
    NOTIFICATION_DATABASE_USER: Joi.string().required(),
    NOTIFICATION_DATABASE_PASSWORD: Joi.string().required(),
    NOTIFICATION_DATABASE_DB: Joi.string().required(),
    NOTIFICATION_HOST: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PASSWORD: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.string().required(),
    MAIL_SECURE: Joi.string().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASS: Joi.string().required(),
    MAIL_FROM: Joi.string().required(),
  }).unknown()

  loadConfig() {
    const { error, value } = AppConfigSchema.env.validate(process.env, {
      abortEarly: false,
    });

    if (error) {
      throw new Error(`Configuração inválida: ${error.details.map((detail) => detail.message).join(", ")}`);
    }

    return value as EnvDtoResult
  }
}



export const appConfig = new AppConfigSchema();