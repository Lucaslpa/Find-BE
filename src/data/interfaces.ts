import {erro} from '../domain/protocols/errors/ProcessError';
export interface encrypt {
    encrypt(password: string): Promise<string>
}

export interface DBrepositoryQuerys {
    addToDB(Account: DataAccountTypes): Promise<DataAccountTypesRes>
    getOfDb(email: string): Promise<DataAccountTypesRes>

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


export interface TokenGeneratorType {
    loadToken(data: string) : Promise<string | erro>
 }

export interface CompareType {
     compare(value: string, hash: string): Promise<boolean>
 }

export interface DecodeType {
    decodeToken(token: string): Promise<any>

 }
