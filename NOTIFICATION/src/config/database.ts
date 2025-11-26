import { Sequelize } from "sequelize";
import { appConfig } from "../shared/schemas/app-config-env";

const config = appConfig.loadConfig();

const sequelize = new Sequelize(config.NOTIFICATION_DATABASE_DB, config.NOTIFICATION_DATABASE_USER ,config.NOTIFICATION_DATABASE_PASSWORD, {
  host: config.NOTIFICATION_HOST,
  port: Number(config.NOTIFICATION_DATABASE_PORT),
  dialect: "mysql",
});

export async function connectWithRetry() {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log("Conectado ao banco de dados com sucesso!");
      connected = true;
    } catch (error) {
      console.log("Falha na conexão com o banco, tentando novamente em 5 segundos...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

export default sequelize;

