import {updateAccount} from '../../../domain/useCase/updateAccount';
import {DBrepositoryQuerys} from '../../../data/interfaces';
import {encrypt} from '../../../infra/criptography/bcrypt.adapter';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import {decodeTokenType} from '../../../infra/token/jwtokeninterfaces';
interface dataAccount {
  token: string,
  modifie: string
}
export class EditAccountController {
  constructor(private readonly updater: updateAccount,
          private readonly DBquerys : DBrepositoryQuerys,
          private readonly criptography: encrypt,
          private readonly decode : decodeTokenType,

  ) {}
  async edit(data: dataAccount ): Promise<any> {
    const infos = await this.decode.decodeToken(data.token);
    console.log(infos);
    const account = await this.DBquerys.getOfDb(infos.email);
    if (!account) {
      return 400;
    }
    const comparePasswordIsEqual = await this.criptography.compare(data.modifie, account.password);
    if (comparePasswordIsEqual) {
      return new Error(400).return('Escolha uma senha que não seja igual ao anterior');
    }
    const passwordEncrypted = await this.criptography.encrypt(data.modifie);
    const newData = {
      email: infos.email,
      modifie: passwordEncrypted,
    };
    const res = await this.updater.editPassword(newData);

    return res;
  }
}
