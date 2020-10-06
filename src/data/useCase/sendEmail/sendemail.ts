import {sendEmail} from '../../../domain/useCase/sendEmail';
import {transporterAdapter} from '../../../domain/utils/transporterEmailAdapter';

export class SendEmail implements sendEmail {
  constructor(private transporter: transporterAdapter) {}
  send(email: string): void {
    const link = 'http://localhost:2500/changePassword?user=token';
    this.transporter.send(email);
    return;
  }
}
