import {AddAccountRepositoryTypes, DataAccountTypes, DataAccountTypesRes} from
  '../../../data/interfaces';
import {QueryRepositoryTypes} from '../typeorm/interfaces';

export default class sqliteAccountRepo implements AddAccountRepositoryTypes {
  private readonly typeormQuery: QueryRepositoryTypes

  constructor(typeormQuery: QueryRepositoryTypes ) {
    this.typeormQuery = typeormQuery;
  }

  async addToDB(Account: DataAccountTypes): Promise<DataAccountTypesRes> {
    const account = await this.typeormQuery.create(Account);
    return Promise.resolve(account);
  }
}
