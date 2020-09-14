import LoginController from './LoginController';
import EmailValidator from '../../../utils/email-valitator/emailvalitador';
import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import ERROR from '../../../domain/protocols/errors/ProcessError';


class Authenticate implements ClassAuthenticate {
  async auth(email: string, password: string ): Promise<string> {
    return new Promise((resolve)=> resolve(''));
  }
}


function makeLoginController() {
  const emailvalidator = new EmailValidator;
  const authenticate = new Authenticate;
  return {logincontroller: new LoginController(emailvalidator, authenticate), emailvalidator: emailvalidator,
    authenticate: authenticate,
  };
}


describe('Login Controller ', () => {
  test('should return status 400/error if  email is not provided ', async () => {
    const {logincontroller} = makeLoginController();
    const data = {
      body: {
        password: '123',
      },
    };
    const res = await logincontroller.login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('Error: email not inserted');
  });

  test('should return status 400/error if  password is not provided ', async () => {
    const {logincontroller} = makeLoginController();
    const data = {body: {
      email: 'lucas@gmail.com',
    }};
    const res = await logincontroller.login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('Error: password not inserted');
  });


  test('should return status 400/error if  email is invalid ', async () => {
    const {logincontroller} = makeLoginController();
    const data = {body: {
      email: 'lucasgmail.com',
      password: '123',
    }};
    const res = await logincontroller.login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('Error: Email is invalid');
  });


  test('should return status error if  email validator throws ', async () => {
    const {logincontroller, emailvalidator} = makeLoginController();
    jest.spyOn(emailvalidator, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });

    const data = {body: {
      email: 'lucasgmail.com',
      password: '123',
    }};
    const res = await logincontroller.login(data);

    expect(res).toEqual(new ERROR().return(`${new Error()}`));
  });


  test('should return status error if  authenticate throws ', async () => {
    const {logincontroller, authenticate} = makeLoginController();
    jest.spyOn( authenticate, 'auth' ).mockReturnValue(new Promise((resolve)=> resolve('')));

    const data = {body: {
      email: 'lucas@gmail.com',
      password: '123',
    }};
    const res = await logincontroller.login(data);

    expect(res).toEqual(new ERROR().return(' Unauthorized'));
  });
});

