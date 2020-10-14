import SignUpController from '../../../presentation/controllers/SignUpController/SignUp';
import DbAddAccount from '../../../data/useCase/dbAddAccount/dbAddAccount';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/accountRepo/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import entityAccount from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import signUpValidationComposite from '../validatorsComposite/signup-validation-composite';


function SignUpFactory() {
  const querys = new Querys(entityAccount);
  const repo = new SqliteAccountRepo(querys);
  const cript = new Encrytp;
  const dbaddaccount = new DbAddAccount(cript, repo );
  const validationcomposite = signUpValidationComposite();


  return new SignUpController( dbaddaccount, validationcomposite );
}


export default SignUpFactory;
