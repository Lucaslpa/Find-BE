import AddAccount from './dbAddAccount';
import {encrypt} from '../../interfaces';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import accountentity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import connection from '../../../infra/db/ConnectionHelper';

class Encrytp implements encrypt {
  async encrypt(password: string): Promise<string> {
    const hashedPassword = 'Hash Password';
    return Promise.resolve(hashedPassword);
  }
}


function makedbAddAcount() {
  const encrypt = new Encrytp;
  const querys = new Querys(accountentity);
  const addaccountrepository = new SqliteAccountRepo(querys);
  const addaccount = new AddAccount(encrypt, addaccountrepository);
  return {encrypt, addaccount, addaccountrepository};
}


describe('DataBase add account', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });

  test('should  ensure encrypted is called with correct password', () => {
    const {addaccount, encrypt} = makedbAddAcount();
    const data = {
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',

    };
    const spy = jest.spyOn(encrypt, 'encrypt');
    const res = addaccount.add(data);
    res;
    expect(spy).toHaveBeenCalledWith(data.password);
  });

  test('should return a registred account with success', async () => {
    const {addaccount} = makedbAddAcount();
    const data = {
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',
    };
    const res = await addaccount.add(data);
    expect(res.id).toBeTruthy();
    expect(res.email).toEqual(data.email);
    expect(res.name).toEqual(data.name);
    expect(res.password).toEqual(data.password);
  });
});
