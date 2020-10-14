import {PubsRepo} from './pubsRepo';
import connection from '../../ConnectionHelper';
import {Querys} from './../../Querys/typeOrmQuerysAccount';
import pubsEntity from '../database/entity/Pubs.entity';

const makeSut = () => {
  const query = new Querys(pubsEntity);
  return {
    sut: new PubsRepo(query),
  };
};

describe('Name of the group', () => {
  beforeAll(async ()=>{
    await connection.create();
  });

  afterAll(async ()=>{
    await connection.close();
  });
  test('should insert a pub into db ', async () => {
    const {sut} = makeSut();
    const data = {
      title: 'teste',
      companyName: 'teste_company',
      tecnology: 'python',
      informações: 'Buscamos qualquer coisa',
      contato: 'l1@mail.com',
      preço: '3000',
      localizaçao: 'Rio de Janeiro, RJ',
      typo: 'clt',
      presencialOuRemoto: 'Presencial',
    };
    const res = await sut.addToDB(data);

    expect(res.id).toBeTruthy();
  });
});
