import {transporterAdapter} from '../../domain/utils/transporterEmailAdapter';
import nodemailer from 'nodemailer';


export class NodeMailerAdapter implements transporterAdapter {
  async send(email: string): Promise<any> {
    const smtpConfig = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: '1lucaslpa12345@gmail.com',
        pass: '40036711lA',
      },
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    const info = await transporter.sendMail({
      from: 'test email', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
    return info;
  }
}
