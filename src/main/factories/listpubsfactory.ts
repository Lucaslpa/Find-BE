import {Listpubs} from '../../data/useCase/listpubs/listpubs';
import {PubsRepo} from '../../infra/db/sqlite/pubsRepo/pubsRepo';
import {Querys} from '../../infra/db/Querys/typeOrmQuerysAccount';
import pubsentity from '../../infra/db/sqlite/database/entity/Pubs.entity';


export const listPubs = () => {
  const querys = new Querys(pubsentity);
  const pubsrepo = new PubsRepo(querys);


  return new Listpubs(pubsrepo);
};
