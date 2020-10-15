import {PublishController} from '../../../presentation/controllers/publishController/publishController';
import {Publish} from '../../../data/useCase/publish/publish';
import {PubsRepo} from '../../../infra/db/sqlite/pubsRepo/pubsRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import pubsentity from '../../../infra/db/sqlite/database/entity/Pubs.entity';
import Tokenverify from '../../../infra/token/jwtokenVerifyTokenAdapter';
import key from '../../../../.authenticateKey';

export const publishFactory = () => {
  const k = key;
  const querys = new Querys(pubsentity);
  const pubsrepo = new PubsRepo(querys);
  const verify = new Tokenverify(k);
  const publish = new Publish(pubsrepo, verify);
  return new PublishController(publish);
};
