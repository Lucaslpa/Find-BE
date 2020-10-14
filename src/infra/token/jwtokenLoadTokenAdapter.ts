import {loadTokenType} from './jwtokeninterfaces';
import jwt from 'jsonwebtoken';
import {erro, Error} from '../../domain/protocols/errors/ProcessError';

export class LoadToken implements loadTokenType {
    private readonly privateKey: string
    constructor(privateKey:string) {
      this.privateKey = privateKey;
    }

    async loadToken(id: string, email: string) : Promise<string | erro> {
      try {
        const token = jwt.sign({id, email}, this.privateKey);
        if (!token) {
          return new Error(500).return('Something wrong');
        }
        return token;
      } catch (err) {
        return new Error(500).return('Something wrong');
      }
    }
}
