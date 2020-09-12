import {AddAccountType} from '../interfaces';
import {DataAccountTypesRes, DataAccountTypes} from '../../data/interfaces';

class AddAccount implements AddAccountType {
  async add(DataAccount: DataAccountTypes ): Promise<DataAccountTypesRes> {
    const AccountInserted = {


      id: 2,
      ...DataAccount,

    };
    return new Promise((resolve) => resolve(AccountInserted));
  }
}

export default AddAccount;
