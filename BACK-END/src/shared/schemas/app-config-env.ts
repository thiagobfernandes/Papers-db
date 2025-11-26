import Joi from 'joi'
import { EnvDtoResult } from '../dtos/envDTO';
import * as dotenv from 'dotenv';
dotenv.config()


class AppConfigSchema {
    static env = Joi.object({
        PORT: Joi.number().min(1024).max(66504).default(3000).required(),
        DATABASE_PORT:Joi.string().required(),
        DATABASE_USER:Joi.string().required(),
        DATABASE_PASSWORD:Joi.string().required(),
        JWT_SECRET:Joi.string().required(),
        DATABASE_DB:Joi.string().required(),
        HOST: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        BACKEND_URL: Joi.string().required(),
        REDIS_PASSWORD: Joi.string().required(),
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