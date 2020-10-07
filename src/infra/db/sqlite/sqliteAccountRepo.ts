import {DBrepositoryQuerys, DataAccountTypes, DataAccountTypesRes} from
  '../../../data/interfaces';
import {QueryRepositoryTypes} from '../Querys/interfaces';
import {dataAccountupdate} from '../../../domain/useCase/updateAccount';
export interface account{
  email: string
  password: string
}

export class SqliteAccountRepo implements DBrepositoryQuerys {
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

  async editDB(data: dataAccountupdate ): Promise<DataAccountTypesRes> {
    const res = await this.Querys.edit(data);
    return Promise.resolve(res);
  }
}
