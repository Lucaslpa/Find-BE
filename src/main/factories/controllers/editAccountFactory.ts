import {EditAccountController} from '../../../presentation/controllers/editAccountController/editaccountController';
import {EditAccount} from '../../../data/useCase/editAccount/editAccount';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import entityAccount from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {DecodeToken} from '../../../infra/token/jwtDecode';
export const editAccountFactory = () => {
  const criptography = new Encrytp;
  const querys = new Querys(entityAccount);
  const dbQuerys = new SqliteAccountRepo(querys);
  const updater = new EditAccount(dbQuerys);
  const decoder = new DecodeToken;
  return new EditAccountController(updater, dbQuerys, criptography, decoder );
};
