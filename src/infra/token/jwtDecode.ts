import jwt from 'jwt-decode';
import {decodeTokenType} from './jwtokeninterfaces';
import {Error} from '../../domain/protocols/errors/ProcessError';

export class DecodeToken implements decodeTokenType {
  async decodeToken(token: string): Promise<any> {
    try {
      const data = jwt(token);
      return new Promise((resolve) => resolve(data));
    } catch (err) {
      return new Error(500).return('something wrong');
    }
  }
}
