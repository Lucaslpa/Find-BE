import LoginController from '../../presentation/controllers/LogInController/LoginController';
import EmailValiator from '../../utils/email-valitator/emailvalitador';
import Auth from '../../data/useCase/authentication/authenticate';
import DbRepo from '../../infra/db/sqlite/sqliteAccountRepo';
import Token from '../../infra/token/jwtokenAdapter';
import TypeORMrequire from '../../infra/db/typeorm/typesOrmQuerys';
import Entity from '../../infra/db/sqlite/database/entity/Accounts.entity';
import Compare from '../../infra/criptography/bcrypt.adapter';

require('dotenv').config();
import s from '../../../.s';

export default function LoginFactory() {
  const secretKey = s;
  const compare = new Compare;
  const emailvalitador = new EmailValiator;
  const typeormrequire = new TypeORMrequire(Entity);
  const token = new Token(secretKey);
  const dbrepo = new DbRepo(typeormrequire);
  const auth = new Auth(dbrepo, token, compare);
  return new LoginController(emailvalitador, auth);
}
