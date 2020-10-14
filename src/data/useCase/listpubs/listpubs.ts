import {pubsrepo} from '../../../domain/repos/pubsRepo';
import {listpubs} from '../../../domain/useCase/listpubs';

export class Listpubs implements listpubs {
  constructor(
            private readonly pubsrepo: pubsrepo,
  ) {}
  async list(): Promise<any> {
    const res = await this.pubsrepo.getOfDB();

    if (!res) {
      return {
        status: 404,
        body: 'Nada encontrado',
      };
    }
    return {
      status: 200,
      body: res,
    };
  }
}
