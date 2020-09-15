import SignUpController from '../../presentation/controllers/SignUpController/SignUp';
import DbAddAccount from '../../data/useCase/dbAddAccount/dbAddAccount';
import Criptography from '../../infra/criptography/bcrypt.adapter';
import DqliteAccountRepo from '../../infra/db/sqlite/sqliteAccountRepo';
import TypeormQuerys from '../../infra/db/typeorm/typesOrmQuerys';
import entityAccount from '../../infra/db/sqlite/database/entity/Accounts.entity';
import signUpValidationComposite from './signup-validation-composite';


function SignUpFactory() {
  const querys = new TypeormQuerys(entityAccount);
  const repo = new DqliteAccountRepo(querys);
  const cript = new Criptography;
  const dbaddaccount = new DbAddAccount(cript, repo );
  const validationcomposite = signUpValidationComposite();


  return new SignUpController( dbaddaccount, validationcomposite );
}


export default SignUpFactory;
