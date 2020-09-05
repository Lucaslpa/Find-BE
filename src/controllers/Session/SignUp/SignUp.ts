import {SignUpTypesRequest, SignUpTypesResponse, ValidatorEmailTypes, SignUpControllerTypes,

} from './interfaces';

class SignUpController implements SignUpControllerTypes {
   private readonly emailValidator:ValidatorEmailTypes

   constructor(emailValidator: ValidatorEmailTypes) {
     this.emailValidator = emailValidator;
   }


   signUp(Data: SignUpTypesRequest): SignUpTypesResponse {
     const fields = [Data.name, Data.email, Data.password, Data.passwordConfirm];
     const fieldsName = ['name', 'email', 'password', 'passwordConfirm'];
     for (let i = 0; i < fields.length; i++ ) {
       if (!fields[i]) {
         return {
           status: 400,
           error: `missing: ${fieldsName[i]}`,
         };
       }
     };

     if (Data.email) {
       const emailIsValid = this.emailValidator.isInvalid(Data.email);
       if (emailIsValid) {
         console.log(Data.email);
         return {
           status: 400,
           error: `invalid: ${Data.email}`,
         };
       }
     }

     return Data;
   }
}


export default SignUpController;
