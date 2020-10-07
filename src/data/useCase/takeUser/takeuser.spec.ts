import {TakeUserFromDB} from './takeuser';
import {SqliteAccountRepo} from '../../../infra/db/sqlite/sqliteAccountRepo';
import {Querys} from '../../../infra/db/Querys/typesOrmQuerys';
import userEntity from '../../../infra/db/sqlite/database/entity/Accounts.entity';
import {Error} from '../../../domain/protocols/errors/ProcessError';

const makeSUT = () => {
  const querys = new Querys(userEntity);
  const userrepo = new SqliteAccountRepo(querys);
  return {
    sut: new TakeUserFromDB(userrepo),
    userrepo,
  };
};

describe('take user', () => {
  test('should ensure getOfDb is called with correct values ', () => {
    const {sut, userrepo} = makeSUT();
    const spy = jest.spyOn(userrepo, 'getOfDb');
    const email = 'lucaslpa@gmail.com';
    sut.get(email);
    expect(spy).toHaveBeenCalledWith(email);
  });
  test('should ensure getOfDb return error if fails ', async () => {
    const {sut, userrepo} = makeSUT();
    jest.spyOn(userrepo, 'getOfDb').mockImplementationOnce((): any => {
      return new Error(404).return(' Not found');
    });
    const email = 'lucaslpa@gmail.com';
    const res = await sut.get(email);
    expect(res).toEqual(new Error(404).return(' Not found'));
  });
});
