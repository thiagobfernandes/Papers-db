import express from "express";
import sequelize, { connectWithRetry } from "./config/database";
import { appConfig } from "./shared/schemas/app-config-env";
import userRoute from './modules/users/routes'
import loginRoute from './modules/authentication/routes'
import PapersRoute from './modules/papers/routes'
import PlatformRoutes from './modules/platform/routes'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import { swaggerSpec } from "./config/swagger";
import { initializeRedis } from "./config/redis";



const app = express();
const config = appConfig.loadConfig()


app.use(express.json());
app.use('/api/upload', express.static('upload'));
app.use(express.urlencoded({ extended: true }));

app.use(cors())


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'ExploitDB API Documentation'
}));
app.use('/api', userRoute);
app.use('/api', loginRoute);
app.use('/api', PlatformRoutes);
app.use('/api', PapersRoute);



async function startServer() {
  try {
    await connectWithRetry(); 
    await sequelize.sync({ alter: true });
    await initializeRedis();
    console.log("Database synced successfully!");

    app.listen(config.PORT, () => {
      console.log("Server is running on port", config.PORT);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();