import sequelize from "./config/database";
import { startEmailSubscriber } from "./workers/email-subscriber";

async function startServer() {
    try {
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
}
startServer();

startEmailSubscriber()