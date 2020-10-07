import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import AccountEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {EditAccount} from './editAccount';
import connection from '../../../infra/db/ConnectionHelper';
import {editfields} from '../../../domain/useCase/updateAccount';

const makeSuts = () => {
  const entity = AccountEntity;
  const querys = new Querys(entity);
  const accountQuerys = new SqliteAccountRepo(querys);
  return {
    sut: new EditAccount(accountQuerys),
    accountQuerys,
  };
};


describe('edit Account ', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });
  test('should ensure account querys is called wit correct value', async () => {
    const {sut, accountQuerys} = makeSuts();
    const spy = jest.spyOn(accountQuerys, 'editDB');
    const account = {
      email: 'email_Invalid@gmail.com',
      modifie: '333',
    };
    const toCall = {
      email: account.email,
      modifie: {
        editField: editfields.password,
        dataEditField: account.modifie,
      },
    };

    await sut.editPassword(account);
    expect(spy).toHaveBeenCalledWith(toCall);
  });
});
