import {tokentype} from './jwtokeninterfaces';
import jwt from 'jsonwebtoken';


export default class Token implements tokentype {
    private readonly privateKey: string
    constructor(privateKey:string) {
      this.privateKey = privateKey;
    }

    async loadToken(data: string) : Promise<string > {
      const token = jwt.sign({id: data}, this.privateKey, {algorithm: 'RS256'});

      return token;
    }
}
