import {NodeMailerAdapter} from './nodemailerAdapter';
const makeSut = () => {
  return {
    sut: new NodeMailerAdapter,
  };
};

describe('nodemailer Adapter', () => {
  test('should ensure node mailer send email  ', async () => {
    const {sut} = makeSut();
    const email = 'l1.lucas333@hotmail.com';
    const res = await sut.send(email);
    console.log(res);
  });
});
