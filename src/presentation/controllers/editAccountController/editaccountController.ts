import {updateAccount} from '../../../domain/useCase/updateAccount';
import {dataAccount} from '../../../domain/useCase/updateAccount';
import {DBrepositoryQuerys} from '../../../data/interfaces';
import {encrypt} from '../../../infra/criptography/bcrypt.adapter';
import {Error} from '../../../domain/protocols/errors/ProcessError';
export class EditAccountController {
  constructor(private readonly updater: updateAccount,
          private readonly DBquerys : DBrepositoryQuerys,
          private readonly criptography: encrypt,

  ) {}
  async edit(data: dataAccount ): Promise<any> {
    const account = await this.DBquerys.getOfDb(data.email);
    const comparePasswordIsEqual = await this.criptography.compare(data.modifie, account.password);
    if (comparePasswordIsEqual) {
      return new Error(400).return('Escolha uma senha que não seja igual ao anterior');
    }
    const passwordEncrypted = await this.criptography.encrypt(data.modifie);
    data.modifie = passwordEncrypted;

    const res = await this.updater.editPassword(data);

    return res;
  }
}
