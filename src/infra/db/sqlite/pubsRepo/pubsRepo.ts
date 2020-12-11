
import {data} from '../../../../domain/repos/pubsRepo';
import {QueryRepositoryTypes} from './../../Querys/interfaces';
export class PubsRepo {
  constructor(
         private readonly dbquery: QueryRepositoryTypes,
  ) {}

  async addToDB(data: data): Promise<any> {
    const res = await this.dbquery.create(data);
    return res;
  }

  async getOfDB(index:number): Promise<[{}]> {
    const res = await this.dbquery.getAll(index * 10 - 10 );
    return res;
  }

  async searchOfDB(index:number, search: string): Promise<[{}]> {
    const res = await this.dbquery.search({index: index * 10 - 10, search});
    return res;
  }

  async searchRegionOfDB(index:number, region: string): Promise<[{}]> {
    const res = await this.dbquery.searchRegião({index: index * 10 - 10, region});

    return res;
  }
}
