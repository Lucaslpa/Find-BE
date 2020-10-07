import SignUpController from './SignUp';
import {ValidatorEmailTypes} from './interfaces';
import {Validation, error} from '../CompositeValidators/interfaces';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import AddAccount from '../../../data/useCase/dbAddAccount/dbAddAccount';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import AccountEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import connection from '../../../infra/db/ConnectionHelper';
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
  const encrypt = new Encrytp;
  const entity = AccountEntity;
  const querys = new Querys(entity);
  const addaccountrepo = new SqliteAccountRepo(querys);
  const addaccount = new AddAccount(encrypt, addaccountrepo);
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
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });
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
    jest.spyOn(validatestub, 'validate').mockReturnValue(new Error(400).return('any_error'));
    const data = {
      name: 'namehere',
      email: 'email_Invalid@gmail.com',
      password: 'password',
      passwordConfirm: 'invalidPassword',
    };
    const res = await signupcontroller.signUp(data);

    expect(res).toEqual(new Error(400).return('any_error'));
  });
});
