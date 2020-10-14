import {data} from './../../../../domain/useCase/publish.interfaace';
import {QueryRepositoryTypes} from './../../Querys/interfaces';
export class PubsRepo {
  constructor(
         private readonly dbquery: QueryRepositoryTypes,
  ) {}

  async addToDB(data: data): Promise<any> {
    const res = await this.dbquery.create(data);
    return res;
  }

  async getOfDB(): Promise<[{}]> {
    const res = await this.dbquery.getAll();
    return res;
  }
}
