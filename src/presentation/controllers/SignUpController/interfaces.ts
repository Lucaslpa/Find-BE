import {DataAccountTypesRes} from '../../../data/interfaces';

export interface SignUpTypesRequest {
    name?: string,
    email?: string,
    password?: string,
    passwordConfirm?: string
 }

export interface SignUpTypesResponse {
  status: number
  body?: {
    id: number
    name: string,
    email: string,


  }
  error?: string
}

export interface ValidatorEmailTypes {
  isValid(Email: string): boolean
}

export interface SignUpControllerTypes {
  signUp(Data: SignUpTypesRequest): Promise<SignUpTypesResponse>,
}

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

interface DataAccountTypes {
  email?: string,
  name?: string,
  password?: string
}

export interface AddAccountType {
   add(DataAccount: DataAccountTypes ): Promise<DataAccountTypesRes>
}
