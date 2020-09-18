import SignUpController from './SignUp';
import {ValidatorEmailTypes} from './interfaces';
import AddAccount from '../../../domain/useCase/accountCreate';
import {Validation, error} from '../validators/interfaces';
import ERROR from '../../../domain/protocols/errors/ProcessError';

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
    validate(data: any): undefined | error {
      return;
    }
  };

  return new ValidateStub();
};

const makeSignUpController = (): MakeTypes => {
  const addaccount = new AddAccount;
  const validatestub = makeValidator();
  const emailValidator = new EmailValidator;

  const signupcontroller = new SignUpController(addaccount, validatestub);

  return {
    emailValidator,
    signupcontroller,
    validatestub,
  };
};


describe('Sign Up', () => {
  test('Should ensure  if validation is call with corret values', async () => {
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

  test('Should ensure  400/error if validation return error', async () => {
    const {signupcontroller, validatestub} = makeSignUpController();
    jest.spyOn(validatestub, 'validate').mockReturnValue(new ERROR(400).return('any_error'));
    const data = {
      name: 'namehere',
      email: 'email_Invalid@gmail.com',
      password: 'password',
      passwordConfirm: 'invalidPassword',
    };
    const res = await signupcontroller.signUp(data);

    expect(res).toEqual(new ERROR(400).return('any_error'));
  });
});
