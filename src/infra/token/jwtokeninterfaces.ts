export {DataAccountTypesRes} from '../../data/interfaces';
import {erro} from '../../domain/protocols/errors/ProcessError';

export interface loadTokenType {
     loadToken(id: string, email: string) : Promise<string | erro>,
}

export interface decodeTokenType {
     decodeToken(token: string): Promise<any>
}
