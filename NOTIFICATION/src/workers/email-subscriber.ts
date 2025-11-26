import { getRedisClient, initializeRedis } from '../config/redis';
import { saveNotificationRepository } from '../infra/repositories/save-notification-repository';
import { EmailService } from '../shared/email/email';
import { Logger } from '../shared/helpers/logger';


interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  name: string;
  link: string;
  author: string;
}


export async function startEmailSubscriber() {
  try {
    await initializeRedis();
    const client = getRedisClient();

    const subscriberClient = client.duplicate();
    await subscriberClient.connect();

    Logger.info('NOTIFICATION Worker: Initializing email subscriber...');

    const emailService = new EmailService();

    await subscriberClient.subscribe('papers:created', async (message) => {
      try {
        const emailData = JSON.parse(message);

        Logger.info(`
          Mensagem recebida
          Para: ${emailData.to}
          Assunto: ${emailData.subject}
        `);

        const templateData = {
          name: emailData.name || 'Pessoa',
          subject: emailData.subject,
          body: emailData.body,
          author: emailData.author || 'Desconhecido',
          link: emailData.link || '#',
          sentAt: new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }),
        };

        await emailService.sendEmail(emailData.to, emailData.subject, templateData);
        await saveNotificationRepository({
          emailTo: emailData.to,
          emailSubject: templateData.subject,
          emailBody: templateData.body,
          sentAt: new Date(),
        });
        Logger.info(`SendEmail: Email enviado para ${emailData.to} com sucesso!`);
      } catch (error) {
        Logger.error(`Erro ao processar mensagem: ${error}`);
      }
    });

    Logger.info('Aguardando mensagens no canal "papers:created"...');
  } catch (error) {
    Logger.error(`Erro ao iniciar subscriber: ${error}`);
    process.exit(1);
  }
}

startEmailSubscriber();
