import {searchRegion} from '../../../domain/useCase/search';
import {pubsrepo} from '../../../domain/repos/pubsRepo';
export class SearchRegion implements searchRegion {
  constructor(
    private readonly pubsrepo: pubsrepo,
  ) {}
  async searchRegion(index: number, region: string): Promise<object[] | null> {
    const res = await this.pubsrepo.searchRegionOfDB(index, region);
    return res;
  }
}
