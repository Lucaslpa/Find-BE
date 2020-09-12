import LoginController from './LoginController';
import EmailValidator from '../../../utils/email-valitator/emailvalitador';


function makeLoginController() {
  const emailvalidator = new EmailValidator;
  return new LoginController(emailvalidator);
}


describe('Login Controller ', () => {
  test('should return status 400/error if  email is not provided ', async () => {
    const {login} = makeLoginController();
    const data = {
      body: {
        password: '123',
      },
    };
    const res = await login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('Error: email not inserted');
  });

  test('should return status 400/error if  password is not provided ', async () => {
    const {login} = makeLoginController();
    const data = {body: {
      email: 'lucas@gmail.com',
    }};
    const res = await login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('Error: password not inserted');
  });


  test('should return status 400/error if  email is invalid ', async () => {
    const logincontroller = makeLoginController();
    const data = {body: {
      email: 'lucasgmail.com',
      password: '123',
    }};
    const res = await logincontroller.login(data);
    expect(res.status).toEqual(400);
    expect(res.error).toEqual('Error: Email is invalid');
  });
});
