import jwt from 'jsonwebtoken';
import {decodeTokenType} from './jwtokeninterfaces';
import {Error} from '../../domain/protocols/errors/ProcessError';


export default class VerifyToken implements decodeTokenType {
    private readonly privateKey: string
    constructor(privateKey:string) {
      this.privateKey = privateKey;
    }


    async decodeToken(token: string): Promise<any> {
      try {
        const data = await jwt.verify(token, this.privateKey);
        if (!data) {
          return new Error(401).return('Unauthorized');
        }
        return new Promise((resolve) => resolve(data));
      } catch (err) {
        return new Error(401).return('Unauthorized');
      }
    }
}
