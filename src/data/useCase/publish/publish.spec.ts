import {Publish} from './publish';
import {PubsRepo} from '../../../infra/db/sqlite/pubsRepo/pubsRepo';
import {Querys} from '../../../infra/db/Querys/typeOrmQuerysAccount';
import pubsentity from '../../../infra/db/sqlite/database/entity/Pubs.entity';
import VerifyClass from '../../../infra/token/jwtokenVerifyTokenAdapter';
import authenticateKey from '../../../../.authenticateKey';

const makeSut = () => {
  const querys = new Querys(pubsentity);
  const pubsrepo = new PubsRepo(querys);
  const verify = new VerifyClass(authenticateKey);
  return {
    sut: new Publish(pubsrepo, verify),
    pubsrepo,
    verify,
  };
};

describe('publish', () => {
});
