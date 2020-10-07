import {} from '../../../data/useCase/editAccount/editAccount';
import {EditAccountController} from './editaccountController';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import AccountEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import connection from '../../../infra/db/ConnectionHelper';
import {EditAccount} from '../../../data/useCase/editAccount/editAccount';


const makeSuts = () => {
  const entity = AccountEntity;
  const querys = new Querys(entity);
  const accountQuerys = new SqliteAccountRepo(querys);
  const encrypt = new Encrytp;
  const updater = new EditAccount(accountQuerys);
  return {
    sut: new EditAccountController(updater, accountQuerys, encrypt),
    accountQuerys,
    encrypt,
  };
};


describe('Edic Account Controller', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });
  test('should ensure return error if passwords is the same', async () => {
    const {sut, encrypt} = makeSuts();
    jest.spyOn(encrypt, 'compare').mockImplementationOnce(():any => {
      return true;
    });
    const account = {
      email: 'lucas@gmail.com',
      modifie: 'novaSenha',
    };
    const res = await sut.edit(account);

    expect(res).toEqual({status: 400, error: 'Escolha uma senha que não seja igual ao anterior'});
  });
});
