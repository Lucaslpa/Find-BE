import {Querys} from '../typeOrmQuerysAccount';
import pubsentity from '../../sqlite/database/entity/Pubs.entity';
import connection from '../../ConnectionHelper';
const makeSut = () => {
  return {
    sut: new Querys(pubsentity),
  };
};


describe('querys', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });


  test('should search pubs ', async () => {
    const {sut} = makeSut();

    const res = await sut.search('tea');
  });
});
