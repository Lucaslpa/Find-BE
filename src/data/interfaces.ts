import {erro} from '../domain/protocols/errors/ProcessError';
import {dataAccountupdate} from '../domain/useCase/updateAccount';


export interface encrypt {
    encrypt(password: string): Promise<string>
}
export interface account{
    email: string
    password: string
  }

export interface DBrepositoryQuerys {
    addToDB(Account: DataAccountTypes): Promise<DataAccountTypesRes>
    getOfDb(email: string): Promise<DataAccountTypesRes>
    editDB(data: dataAccountupdate ): Promise<DataAccountTypesRes>
}


export interface DataAccountTypes {
   name: string,
   email: string,
   password: string
}


export interface DataAccountTypesRes {
    id: number,
    name: string,
    email: string,
    password: string
 }


export interface dbAccountTypes {
    add(DataAccount: DataAccountTypes ): Promise<DataAccountTypesRes>
 }


 export interface datainterface{
    id: string,
    name: string
    email: string
 }

export interface loadTokenType {
    loadToken(data: datainterface ) : Promise<string | erro>,
}

export interface CompareType {
     compare(value: string, hash: string): Promise<boolean>
 }

export interface DecodeType {
    decodeToken(token: string): Promise<any>

 }
