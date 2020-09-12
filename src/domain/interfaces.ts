import {DataAccountTypesRes, DataAccountTypes} from '../data/interfaces';
export interface AddAccountInsert {
    name?: string,
    email?: string,
    password?: string,
    passwordConfirm?: string
  }
export interface AddAccountInserted {
    status: number
    account: any
  }

export interface AddAccountType {
  add(DataAccount: DataAccountTypes ): Promise<DataAccountTypesRes>
  }

