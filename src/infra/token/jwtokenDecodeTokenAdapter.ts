import jwt from 'jsonwebtoken';
import {decodeTokenType} from './jwtokeninterfaces';
import ERROR from '../../domain/protocols/errors/ProcessError';


export default class DecodeToken implements decodeTokenType {
    private readonly privateKey: string
    constructor(privateKey:string) {
      this.privateKey = privateKey;
    }


    async decodeToken(token: string): Promise<any> {
      try {
        const data = await jwt.verify(token, this.privateKey);

        return new Promise((resolve) => resolve(data));
      } catch (err) {
        return new ERROR(401).return(' Unauthorized');
      }
    }
}
