import {encrypt, DataAccountTypes, DataAccountTypesRes, AddAccountRepositoryTypes, dbAccountTypes} from '../../interfaces';


class dbAddAccount implements dbAccountTypes {
    private readonly encrypt: encrypt
    private readonly addaccountrepository: AddAccountRepositoryTypes
    constructor(encrypt: encrypt, addaccountrepository: AddAccountRepositoryTypes) {
      this.encrypt = encrypt;
      this.addaccountrepository = addaccountrepository;
    }
    async add(DataAccount: DataAccountTypes ): Promise<DataAccountTypesRes> {
      const passwordHashed = await this.encrypt.encrypt(DataAccount.password);
      DataAccount.password = passwordHashed;
      const res = await this.addaccountrepository.addToDB(DataAccount);

      return new Promise((resolve) => resolve(res));
    }
}


export default dbAddAccount;
