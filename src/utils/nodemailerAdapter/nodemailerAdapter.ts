import {transporterAdapter, contentData, accountsendEmailConfig} from '../../domain/utils/transporterEmailAdapter';
import nodemailer from 'nodemailer';


export class NodeMailerAdapter implements transporterAdapter {
  constructor(private readonly accountSendEmailConfig: accountsendEmailConfig ) {}
  async send(content: contentData ): Promise<any> {
    const transporter = nodemailer.createTransport(this.accountSendEmailConfig);
    const info = await transporter.sendMail(content);
    return info;
  }
}
