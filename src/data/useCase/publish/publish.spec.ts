import {Publish} from './publish';
import {PubsRepo} from '../../../infra/db/sqlite/pubsRepo/pubsRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import pubsentity from '../../../infra/db/sqlite/database/entity/Pubs.entity';
const makeSut = () => {
  const querys = new Querys(pubsentity);
  const pubsrepo = new PubsRepo(querys);
  return {
    sut: new Publish(pubsrepo),
    pubsrepo,
  };
};

describe('publish', () => {
  test('should  call post with correct value  ', () => {
    const {sut, pubsrepo} = makeSut();
    const spy = jest.spyOn(pubsrepo, 'addToDB');
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
    sut.pub(data);
    expect(spy).toHaveBeenCalledWith(data);
  });
});
