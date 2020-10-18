export {DataAccountTypesRes} from '../../data/interfaces';
import {erro} from '../../domain/protocols/errors/ProcessError';


export interface datainterface{
     id: string,
     name: string
     email: string
  }

export interface loadTokenType {
     loadToken(data: datainterface ) : Promise<string | erro>,
}

export interface decodeTokenType {
     decodeToken(token: string): Promise<any>
}
