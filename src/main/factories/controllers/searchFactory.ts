import {SearchController} from '../../../presentation/controllers/searchControllers/SearchController';
import {Search} from '../../../data/useCase/search/search';
import {SearchRegion} from '../../../data/useCase/search/searchRegion';
import {PubsRepo} from '../../../infra/db/sqlite/pubsRepo/pubsRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import pubsentity from '../../../infra/db/sqlite/database/entity/Pubs.entity';


export const searchFactory = () => {
  const querys = new Querys(pubsentity);
  const pubsrepo = new PubsRepo(querys);
  const searchregion = new SearchRegion(pubsrepo);
  const search = new Search(pubsrepo);

  return new SearchController(search, searchregion);
};
