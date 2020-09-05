import SignUpController from './SignUp';
import {ValidatorEmailTypes} from './interfaces';


const makeSignUpController = (): SignUpController => {
  class EmailValidator implements ValidatorEmailTypes {
    isInvalid(Email: string ) {
      return true;
    }
  }

  const emailValidator = new EmailValidator;
  return new SignUpController(emailValidator);
};


describe('Sign Up', () => {
  test('Should return erro/400 status if without name', () => {
    const controll = makeSignUpController();
    const data = {
      email: 'email@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: name`);
  });

  test('Should return erro/400 status if without email', () => {
    const controll = makeSignUpController();
    const data = {
      name: 'namehere',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: email`);
  });

  test('Should return erro/400 status if without password', () => {
    const controll = makeSignUpController();
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: password`);
  });

  test('Should return erro/400 status if without passwordConfirm', () => {
    const controll = makeSignUpController();
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      password: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: passwordConfirm`);
  });


  test('Should return erro/400 status if email is invalid', () => {
    const controll = makeSignUpController();
    const data = {
      name: 'namehere',
      email: 'email_Invalid@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`invalid: email_Invalid@gmail.com`);
  });
});
