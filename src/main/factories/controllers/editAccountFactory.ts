import {EditAccountController} from '../../../presentation/controllers/editAccountController/editaccountController';
import {EditAccount} from '../../../data/useCase/editAccount/editAccount';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/accountRepo/sqliteAccountRepo';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import entityAccount from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {DecodeToken} from '../../../infra/token/jwtDecode';
import {MinimalCaracteres} from '../../../utils/minmalCaracteres-validator/minimalCaracteres';
export const editAccountFactory = () => {
  const criptography = new Encrytp;
  const querys = new Querys(entityAccount);
  const dbQuerys = new SqliteAccountRepo(querys);
  const updater = new EditAccount(dbQuerys);
  const decoder = new DecodeToken;
  const validatepassword = new MinimalCaracteres(6);
  return new EditAccountController(updater, dbQuerys, criptography, decoder, validatepassword );
};
