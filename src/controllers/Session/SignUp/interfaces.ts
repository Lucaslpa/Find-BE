

export interface SignUpTypesRequest {
    name?: string,
    email?: string,
    password?: string,
    passwordConfirm?: string,
 }

export interface SignUpTypesResponse {
  name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string,
  status?: number,
  error?: string
}

export interface ValidatorEmailTypes {
  isInvalid(Email: string): boolean
}

export interface SignUpControllerTypes {
  signUp(Data: SignUpTypesRequest): SignUpTypesResponse
}
