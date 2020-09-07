import {AddAccountInsert, AddAccountInserted} from '../interfaces';


class AddAccount {
  async addAccount(DataAccount: AddAccountInsert): Promise<AddAccountInserted> {
    const AccountInserted = {
      status: 200,
      account: {
        id: 2,
        ...DataAccount,
      },
    };
    return new Promise((resolve) => resolve(AccountInserted));
  }
}

export default AddAccount;
