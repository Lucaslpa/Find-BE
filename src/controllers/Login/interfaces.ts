export interface SignUpTypesStart {
    email: string,
    password: string,
    passwordConfirm: string,
 }

export interface SignUpTypesFinish {
  email: string,
  password: string,
  passwordConfirm: string,
  status: number
}
