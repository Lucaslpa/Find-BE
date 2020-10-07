import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import AccountEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {EditAccount} from './editAccount';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import connection from '../../../infra/db/ConnectionHelper';


const makeSuts = () => {
  const entity = AccountEntity;
  const querys = new Querys(entity);
  const accountQuerys = new SqliteAccountRepo(querys);
  const encrypt = new Encrytp;
  return {
    sut: new EditAccount(accountQuerys, encrypt),
    accountQuerys,
    encrypt,
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
    const {sut, accountQuerys, encrypt} = makeSuts();
    const spy = jest.spyOn(accountQuerys, 'editDB');
    const account = {
      email: 'lucas@gmail.com',
      password: 'senha_antiga',
    };
    jest.spyOn(encrypt, 'encrypt').mockImplementationOnce((): any => {
      return account.password;
    });
    const res = await sut.edit(account);
    console.log('response', res );
    expect(spy).toHaveBeenCalledWith(account);
  });

  test('should ensure return error if passwords is the same', async () => {
    const {sut, accountQuerys} = makeSuts();
    jest.spyOn(accountQuerys, 'getOfDb').mockImplementationOnce(():any => {
      return {
        password: 'novaSenha',
      };
    });
    const account = {
      email: 'lucas@gmail.com',
      password: 'novaSenha',
    };
    const res = await sut.edit(account);

    expect(res).toEqual({status: 400, error: 'Escolha uma senha que não seja igual ao anterior'});
  });
});
