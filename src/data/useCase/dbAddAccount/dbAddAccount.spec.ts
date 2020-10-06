import AddAccount from './dbAddAccount';
import {DataAccountTypesRes, DBrepositoryQuerys, DataAccountTypes, encrypt} from '../../interfaces';

class Encrytp implements encrypt {
  async encrypt(password: string): Promise<string> {
    const hashedPassword = 'Hash Password';
    return Promise.resolve(hashedPassword);
  }
}

class AddAccountRepository implements DBrepositoryQuerys {
  async addToDB(Account: DataAccountTypes): Promise<DataAccountTypesRes> {
    const AccountInserted = {
      id: 1,
      email: Account.email,
      name: Account.name,
      password: Account.password,
    };
    return new Promise((resolve) => resolve(AccountInserted));
  }
  async getOfDb(email: string): Promise<DataAccountTypesRes> {
    const AccountInserted = {
      id: 1,
      email: '',
      name: '',
      password: '',
    };
    return new Promise((resolve) => resolve(AccountInserted));
  }
}

function makedbAddAcount() {
  const encrypt = new Encrytp;
  const addaccountrepository = new AddAccountRepository;
  const addaccount = new AddAccount(encrypt, addaccountrepository);
  return {encrypt, addaccount, addaccountrepository};
}


describe('DataBase add account', () => {
  test('should  ensure encrypted is called with correct password', () => {
    const {addaccount, encrypt} = makedbAddAcount();
    const data = {
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',

    };
    const spy = jest.spyOn(encrypt, 'encrypt');
    const res = addaccount.add(data);
    res;
    expect(spy).toHaveBeenCalledWith(data.password);
  });

  test('should be call with a valid account ', async () => {
    const {addaccount, addaccountrepository} = makedbAddAcount();
    const spy = jest.spyOn(addaccountrepository, 'addToDB');
    const data = {
      name: 'name',
      email: 'email@gmail.com',
      password: 'password',
    };
    const res = await addaccount.add(data);
    res;
    expect(spy).toHaveBeenCalledWith({name: 'name', email: 'email@gmail.com', password: 'Hash Password'});
  });
});
