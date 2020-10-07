import {DBrepositoryQuerys, account} from '../../interfaces';
import {encrypt} from '../../../infra/criptography/bcrypt.adapter';
import {Error} from '../../../domain/protocols/errors/ProcessError';
export class EditAccount {
  constructor( private readonly querysToDB : DBrepositoryQuerys,
          private readonly hasherPassword: encrypt,
  ) {}
  async edit(data: account ): Promise<any> {
    try {
      const account = await this.querysToDB.getOfDb(data.email);
      if (account.password === data.password) {
        return new Error(400).return('Escolha uma senha que não seja igual ao anterior');
      }
      const passwordEncrypted = await this.hasherPassword.encrypt(data.password);
      data.password = passwordEncrypted;
      console.log('meeeeeeeeeu amigo', data);
      await this.querysToDB.editDB(data);
      return 200;
    } catch (err) {
      console.log(err);
    }
  }
}
