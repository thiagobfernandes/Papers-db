import nodemailer from 'nodemailer';
import { Logger } from '../helpers/logger';
import { PAPER_CREATED_TEMPLATE, TemplateData } from './templates/paper-created';

interface EmailPayload {
  to: string;
  subject: string; // Título do paper
  body: string; // Resumo do paper
  name: string; // Nome do usuário (destinatário)
  author: string; // Autor do paper
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587'),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export class EmailService {

  private renderTemplate(data: TemplateData): string {
    let html = PAPER_CREATED_TEMPLATE;

    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      html = html.replace(regex, value);
    }
    return html;
  }


  async sendEmail(to: string, subject: string, data: TemplateData): Promise<void> {
    try {
      const htmlBody = this.renderTemplate(data);
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: `[Papers JT] Novo Paper: ${subject}`,
        html: htmlBody,
      });

      Logger.info(`Email send successfuly to : ${to}`);
    } catch (error) {
      Logger.error(`Error to send email to : ${to}: ${error}`);

    }
  }
}
