import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import AccountEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
class editAccountStub {
  editDB() {

  }
}


const makeSuts = () => {
  const entity = AccountEntity;
  const querys = new Querys(entity);
  const accountQuerys = new SqliteAccountRepo(querys);
  return {
    sut: new EditAccount,
    accountQuerys,
  };
};


describe('edit Account ', () => {
  test('should ensure account querys is called wit correct value', () => {
    const {sut, accountQuerys} = makeSuts();
    const spy = jest.spyOn(accountQuerys, 'editDB');
    const account = {
      email: 'lucas@gmail.com',
      password: 'novaSenha',
    };
    sut.edit(account);

    expect(spy).toHaveBeenCalledWith(account);
  });
});
