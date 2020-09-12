import SignUpController from '../../presentation/controllers/SignUpController/SignUp';
import EmailValidator from '../../utils/email-valitator/emailvalitador';
import DbAddAccount from '../../data/useCase/dbAddAccount';
import Criptography from '../../infra/criptography/bcrypt.adapter';
import DqliteAccountRepo from '../../infra/db/sqlite/sqliteAccountRepo';
import TypeormQuerys from '../../infra/db/typeorm/typesOrmQuerys';
import entityAccount from '../../infra/db/sqlite/database/entity/Accounts.entity';


function SignUpFactory() {
  const querys = new TypeormQuerys(entityAccount);
  const repo = new DqliteAccountRepo(querys);
  const cript = new Criptography;
  const dbaddaccount = new DbAddAccount(cript, repo );
  const emailvalidator = new EmailValidator;

  return new SignUpController(emailvalidator, dbaddaccount );
}


export default SignUpFactory;
