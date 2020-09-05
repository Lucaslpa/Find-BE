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
