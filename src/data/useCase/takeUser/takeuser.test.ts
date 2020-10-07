import {TakeUserFromDB} from './takeuser';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typesOrmQuerys';
import userEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import connection from '../../../infra/db/ConnectionHelper';
const makeSUT = () => {
  const querys = new Querys(userEntity);
  const userrepo = new SqliteAccountRepo(querys);
  return {
    sut: new TakeUserFromDB(userrepo),
    userrepo,
  };
};

describe('take user', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });

  test('should return a account if user is finded', async () => {
    const {sut} = makeSUT();
    const emails = 'lucas@gmail.com';
    const res = await sut.get(emails);
    expect(res).toHaveProperty('id');
  });
});
