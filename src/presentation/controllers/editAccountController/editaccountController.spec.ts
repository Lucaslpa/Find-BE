import {} from '../../../data/useCase/editAccount/editAccount';
import {EditAccountController} from './editaccountController';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import AccountEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {Encrytp} from '../../../infra/criptography/bcrypt.adapter';
import connection from '../../../infra/db/ConnectionHelper';
import {EditAccount} from '../../../data/useCase/editAccount/editAccount';
import {DecodeToken} from '../../../infra/token/jwtDecode';


const makeSuts = () => {
  const entity = AccountEntity;
  const querys = new Querys(entity);
  const accountQuerys = new SqliteAccountRepo(querys);
  const encrypt = new Encrytp;
  const updater = new EditAccount(accountQuerys);
  const decoder = new DecodeToken;
  return {
    sut: new EditAccountController(updater, accountQuerys, encrypt, decoder),
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
    const {sut, encrypt, accountQuerys} = makeSuts();
    jest.spyOn(accountQuerys, 'getOfDb').mockImplementationOnce(():any => {
      return true;
    });
    jest.spyOn(encrypt, 'compare').mockImplementationOnce(():any => {
      return true;
    });
    const account = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2MiIsImVtYWlsIjoibHVjYXNscGExMjM0NUBnbWFpbC5jb20iLCJpYXQiOjE2MDIwNDc2Nzh9.ZJzNBA7S3wUqrKRisBUGJsCoFH-kG7HEzMnG4zP52XM',
      modifie: 'novaSenha',
    };
    const res = await sut.edit(account);

    expect(res).toEqual({status: 400, error: 'Escolha uma senha que não seja igual ao anterior'});
  });
});
