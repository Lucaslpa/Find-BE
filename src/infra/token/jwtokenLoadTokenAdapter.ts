import {loadTokenType} from './jwtokeninterfaces';
import jwt from 'jsonwebtoken';


export default class LoadToken implements loadTokenType {
    private readonly privateKey: string
    constructor(privateKey:string) {
      this.privateKey = privateKey;
    }

    async loadToken(data: string) : Promise<string > {
      const token = jwt.sign({id: data}, this.privateKey);

      return token;
    }
}
