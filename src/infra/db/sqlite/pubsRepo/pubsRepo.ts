
import {data} from '../../../../domain/repos/pubsRepo';
import {QueryRepositoryTypes} from './../../Querys/interfaces';
export class PubsRepo {
  constructor(
         private readonly dbquery: QueryRepositoryTypes,
  ) {}

  async addToDB(data: data): Promise<any> {
    console.log(data);
    const res = await this.dbquery.create(data);
    return res;
  }

  async getOfDB(index:number): Promise<[{}]> {
    const res = await this.dbquery.getAll(index * 10 - 10 );

    return res;
  }
}
