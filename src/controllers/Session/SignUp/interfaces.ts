

export interface SignUpTypesRequest {
    name?: string,
    email?: string,
    password?: string,
    passwordConfirm?: string
 }

export interface SignUpTypesResponse {
  status: number
  account?: {
    id: number
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
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

export interface AddAccountType {
  addAccount(DataAccount: AddAccountInsert): Promise<AddAccountInserted>
}
