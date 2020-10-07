import {DBrepositoryQuerys, account} from '../../interfaces';


export class EditAccount {
  constructor( private readonly editAccountOnDB : DBrepositoryQuerys ) {}
  async edit(data: account ): Promise<any> {
    this.editAccountOnDB.editDB(data);
  }
}
