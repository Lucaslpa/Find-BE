import accountSendEmailConfig from '../../../.accountSenderEmail';
import {NodeMailerAdapter} from './nodemailerAdapter';
const makeSut = () => {
  return {
    sut: new NodeMailerAdapter(accountSendEmailConfig),
  };
};

describe('nodemailer Adapter', () => {
  test('should ensure node mailer send email  ', async () => {
    const {sut} = makeSut();
    const data = {
      from: 'Encontre group',
      to: 'l1.lucas333@hotmail.com',
      subject: 'New testes',
      text: 'Hello lucas. We are testing!!',
      html: ' <strong> Redefinir Senha </strong> <h1> localhost:200/424124?token <h1> ',
    };
    const res = await sut.send(data);
    expect(res.accepted).toBeTruthy();
  });
});
