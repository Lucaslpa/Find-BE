import SignUpController from './SignUp';
import {ValidatorEmailTypes} from './interfaces';
import AddAccount from '../../../domain/useCase/accountCreate';

interface MakeTypes {
  emailValidator: ValidatorEmailTypes,
  signupcontroller: SignUpController,
}

class EmailValidator implements ValidatorEmailTypes {
  isValid(Email: string ) {
    return true;
  }
}

const makeSignUpController = (): MakeTypes => {
  const addaccount = new AddAccount;
  const emailValidator = new EmailValidator;
  const signupcontroller = new SignUpController(emailValidator, addaccount );

  return {
    emailValidator,
    signupcontroller,
  };
};


describe('Sign Up', () => {
  test('Should return erro/400 status if without name', async () => {
    const {signupcontroller} = makeSignUpController();
    const data = {
      email: 'email@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = await signupcontroller.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: name`);
  });

  test('Should return erro/400 status if without email', async () => {
    const {signupcontroller} = makeSignUpController();
    const data = {

      name: 'namehere',
      password: 'password',
      passwordConfirm: 'password',

    };
    const res = await signupcontroller.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: email`);
  });

  test('Should return erro/400 status if without password', async () => {
    const {signupcontroller} = makeSignUpController();
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      passwordConfirm: 'password',
    };
    const res = await signupcontroller.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: password`);
  });

  test('Should return erro/400 status if without passwordConfirm', async () => {
    const {signupcontroller} = makeSignUpController();
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      password: 'password',
    };
    const res = await signupcontroller.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: passwordConfirm`);
  });

  test('Should return erro/400 status if email is invalid', async () => {
    const {emailValidator, signupcontroller} = makeSignUpController();
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
    const data = {
      name: 'namehere',
      email: 'email_Invalid@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = await signupcontroller.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`invalid: email_Invalid@gmail.com`);
  });

  test('Should return erro/400 status if password confimation is invalid', async () => {
    const {emailValidator, signupcontroller} = makeSignUpController();
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
    const data = {
      name: 'namehere',
      email: 'email_Invalid@gmail.com',
      password: 'password',
      passwordConfirm: 'invalidPassword',
    };
    const res = await signupcontroller.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`invalid: passwordConfirm`);
  });
});
