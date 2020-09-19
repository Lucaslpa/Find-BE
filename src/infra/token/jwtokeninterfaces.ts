export {DataAccountTypesRes} from '../../data/interfaces';

export interface loadTokenType {
     loadToken(data: string) : Promise<string>,
}

export interface decodeTokenType {
     decodeToken(token: string): Promise<any>
}
