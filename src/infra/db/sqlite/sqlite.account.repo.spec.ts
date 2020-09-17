
require('dotenv').config();
import TypeormQuery from '../typeorm/typesOrmQuerys';
import SqliteAccountRepo from './sqliteAccountRepo';
import connection from '../ConnectionHelper';
import entityAccount from './database/entity/Accounts.entity';


describe('DB', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.clear;
    await connection.close();
  });

  /* beforeEach(async () => {
    await connection.clear();
  });*/


  function makeConnection() {
    const typeormQuery = new TypeormQuery(entityAccount);
    const sqliteAccountRepo = new SqliteAccountRepo(typeormQuery);

    return {
      sqliteAccountRepo,
    };
  }


  test('Should return account with success', async () => {
    const {sqliteAccountRepo} = makeConnection();

    const data = {
      name: 'joaozinho',
      email: 'joaozinho22@gmail.com',
      password: '12345',
    };

    const account = await sqliteAccountRepo.addToDB(data);
    expect(account.id).toBeTruthy();
    expect(account.name).toEqual(data.name);
    expect(account.email).toEqual(data.email);
    expect(account.password).toBeTruthy();
  });

  test('Should return a account from db', async () => {
    const {sqliteAccountRepo} = makeConnection();

    const data = {
      name: 'joaozinho',
      email: 'joaozinho22@gmail.com',
      password: '12345',
    };

    const account = await sqliteAccountRepo.getOfDb(data.email);
    expect(account.id).toBeTruthy();
    expect(account.name).toEqual(data.name);
    expect(account.email).toEqual(data.email);
    expect(account.password).toBeTruthy();
  });
});
