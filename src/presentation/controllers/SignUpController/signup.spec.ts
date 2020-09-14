import SignUpController from './SignUp';
import {ValidatorEmailTypes} from './interfaces';
import AddAccount from '../../../domain/useCase/accountCreate';
import {Validation} from '../validators/interfaces';
import Request from './Requests/BadRequest';

const BadRequest = new Request;

interface MakeTypes {
  emailValidator: ValidatorEmailTypes,
  signupcontroller: SignUpController,
  validatestub: Validation
}

class EmailValidator implements ValidatorEmailTypes {
  isValid(Email: string ) {
    return true;
  }
}

const makeValidator = (): Validation => {
  class ValidateStub implements Validation {
    validate(data: any): null | Error {
      return null;
    }
  };

  return new ValidateStub();
};

const makeSignUpController = (): MakeTypes => {
  const addaccount = new AddAccount;
  const validatestub = makeValidator();
  const emailValidator = new EmailValidator;

  const signupcontroller = new SignUpController(emailValidator, addaccount, validatestub);

  return {
    emailValidator,
    signupcontroller,
    validatestub,
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

  test('Should return erro/400 status if password confimation is invalid', async () => {
    const {signupcontroller, validatestub} = makeSignUpController();
    const resSpy = jest.spyOn(validatestub, 'validate');
    const data = {
      name: 'namehere',
      email: 'email_Invalid@gmail.com',
      password: 'password',
      passwordConfirm: 'invalidPassword',
    };
    await signupcontroller.signUp(data);

    expect(resSpy).toHaveBeenCalledWith(data);
  });
});
