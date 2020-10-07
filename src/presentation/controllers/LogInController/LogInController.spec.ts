import LoginController from './LoginController';
import EmailValidator from '../../../utils/email-valitator/emailvalitador';
import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import {error, success} from '../CompositeValidators/interfaces';
import {loginValidatioComposite} from '../../../main/factories/login-valiation-composite';

class Authenticate implements ClassAuthenticate {
  async auth(email: string, password: string ): Promise<error | success> {
    return new Promise((resolve)=> resolve({status: 500, error: 'sim'}));
  }
}


function makeLoginController() {
  const emailvalidator = new EmailValidator;
  const authenticate = new Authenticate;
  return {logincontroller: new LoginController(loginValidatioComposite(), authenticate), emailvalidator: emailvalidator,
    authenticate: authenticate,
  };
}

const makeData = () => {
  return {
    email: 'lucas@gmail.com',
    password: '123',
  };
};


describe('Login Controller ', () => {
  test('should return status 400/error if  email is not provided ', async () => {
    const {logincontroller} = makeLoginController();
    const data = {

      password: '123',

    };
    const res = await logincontroller.login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('email not inserted');
  });

  test('should return status 400/error if  password is not provided ', async () => {
    const {logincontroller} = makeLoginController();
    const data = {
      email: 'lucas@gmail.com',
    };
    const res = await logincontroller.login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('password not inserted');
  });


  test('should return status 400/error if  email is invalid ', async () => {
    const {logincontroller} = makeLoginController();
    const Data = {
      email: 'lucasgmail.com',
      password: '123',
    };

    const res = await logincontroller.login(Data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('email is invalid');
  });


  test('should return status error if  authenticate fails ', async () => {
    const {logincontroller, authenticate} = makeLoginController();
    jest.spyOn(authenticate, 'auth').mockReturnValue(new Promise((resolve)=> resolve(new Error(401).return('Unauthorized'))));
    const Data = makeData();


    const res = await logincontroller.login(Data);

    expect(res).toEqual(new Error(401).return('Unauthorized'));
  });
});

