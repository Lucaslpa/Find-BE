import {loadTokenType} from './jwtokeninterfaces';
import jwt from 'jsonwebtoken';
import {erro, Error} from '../../domain/protocols/errors/ProcessError';
import {datainterface} from './jwtokeninterfaces';


export class LoadToken implements loadTokenType {
    private readonly privateKey: string
    constructor(privateKey:string) {
      this.privateKey = privateKey;
    }

    async loadToken(data: datainterface) : Promise<string | erro> {
      try {
        const token = jwt.sign({data}, this.privateKey);
        if (!token) {
          return new Error(500).return('Something wrong');
        }
        return token;
      } catch (err) {
        return new Error(500).return('Something wrong');
      }
    }
}
