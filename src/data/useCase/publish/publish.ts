
import {data, publish} from './../../../domain/useCase/publish.interfaace';
import {pubsrepo} from '../../../domain/repos/pubsRepo';
import {decodeTokenType} from '../../../infra/token/jwtokeninterfaces';

export class Publish implements publish {
  constructor(
     private readonly dbrepo: pubsrepo,
     private readonly verify: decodeTokenType,
  ) {}
  async pub(data: data ): Promise<any> {
    console.log(data);
    const tokenIsValid = await this.verify.decodeToken(data.token);
    console.log(tokenIsValid);
    if (tokenIsValid.status) {
      return tokenIsValid;
    }
    const newData = {
      account: tokenIsValid.data.id,
      title: data.title,
      companyName: data.companyName,
      tecnology: data.tecnology,
      informações: data.informações,
      contato: data.contato,
      preço: data.preço,
      localizaçao: data.localizaçao,
      typo: data.typo,
      presencialOuRemoto: data.presencialOuRemoto,

    };
    const res = await this.dbrepo.addToDB(newData);
    return res;
  }
}
