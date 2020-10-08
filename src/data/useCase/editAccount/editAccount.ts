import {DBrepositoryQuerys} from '../../interfaces';
import {updateAccount, editfields, dataAccount} from '../../../domain/useCase/updateAccount';
export class EditAccount implements updateAccount {
  constructor( private readonly querysToDB : DBrepositoryQuerys,
  ) {}

  async editPassword(data: dataAccount ) {
    const newaccount = {
      email: data.email,
      modifie: {
        editField: editfields.password,
        dataEditField: data.modifie,
      },
    };
    try {
      await this.querysToDB.editDB(newaccount);
      return {
        status: 200,
        response: 'ok',
      };
    } catch (err) {
      console.log(err);
    }
  }
}
