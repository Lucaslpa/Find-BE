import {SignUpTypesRequest, SignUpTypesResponse} from './interfaces';

class SignUpController {
  signUp(Data: SignUpTypesRequest): SignUpTypesResponse {
    const fields = [Data.name, Data.email, Data.password, Data.passwordConfirm];
    const fieldsName = ['name', 'email', 'password', 'passwordConfirm'];
    for (let i = 0; i <= fields.length; i++ ) {
      if (!fields[i]) {
        return {
          status: 400,
          error: `missing: ${fieldsName[i]}`,
        };
      }
    };


    return Data;
  }
}


export default SignUpController;
