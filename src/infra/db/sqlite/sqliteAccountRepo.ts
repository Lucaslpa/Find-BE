import {AddAccountRepositoryTypes, DataAccountTypes, DataAccountTypesRes} from
  '../../../data/interfaces';
import {QueryRepositoryTypes} from '../Querys/interfaces';

export class SqliteAccountRepo implements AddAccountRepositoryTypes {
  private readonly Querys: QueryRepositoryTypes

  constructor(Querys: QueryRepositoryTypes ) {
    this.Querys = Querys;
  }

  async addToDB(Account: DataAccountTypes): Promise<DataAccountTypesRes> {
    const account = await this.Querys.create(Account);
    return Promise.resolve(account);
  }

  async getOfDb(email: string): Promise<DataAccountTypesRes> {
    const res = await this.Querys.get(email);
    return Promise.resolve(res);
  }
}
