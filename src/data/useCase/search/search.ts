import {search} from '../../../domain/useCase/search';
import {pubsrepo} from '../../../domain/repos/pubsRepo';
export class Search implements search {
  constructor(
    private readonly pubsrepo: pubsrepo,
  ) {}
  async search(index: number, search: string): Promise<object[] | null> {
    const res = await this.pubsrepo.searchOfDB(index, search);
    return res;
  }
}
