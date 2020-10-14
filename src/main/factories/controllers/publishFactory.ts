import {PublishController} from '../../../presentation/controllers/publishController/publishController';
import {Publish} from '../../../data/useCase/publish/publish';
import {PubsRepo} from '../../../infra/db/sqlite/pubsRepo/pubsRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import pubsentity from '../../../infra/db/sqlite/database/entity/Pubs.entity';


export const publishFactory = () => {
  const querys = new Querys(pubsentity);
  const pubsrepo = new PubsRepo(querys);
  const publish = new Publish(pubsrepo);
  return new PublishController(publish);
};
