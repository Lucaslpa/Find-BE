import {SignUpTypesRequest, ValidatorEmailTypes, SignUpControllerTypes,
  AddAccountType, SignUpTypesResponse,
} from './interfaces';
import Request from './Requests/BadRequest';


const BadRequest = new Request;

class SignUpController implements SignUpControllerTypes {
   private readonly emailValidator: ValidatorEmailTypes
   private readonly addaccount: AddAccountType

   constructor(emailValidator: ValidatorEmailTypes, addaccount: AddAccountType) {
     this.emailValidator = emailValidator;
     this.addaccount = addaccount;
   }


   async signUp(Data: SignUpTypesRequest): Promise<SignUpTypesResponse> {
     const fields = [Data.name, Data.email, Data.password, Data.passwordConfirm];
     const fieldsName = ['name', 'email', 'password', 'passwordConfirm'];
     for (let i = 0; i < fields.length; i++ ) {
       if (!fields[i]) {
         return BadRequest.missing(fieldsName[i]);
       }
     };


     if (Data.passwordConfirm) {
       if (Data.password !== Data.passwordConfirm) {
         return BadRequest.invalid('passwordConfirm');
       }
     }

     if (Data.email) {
       const emailIsValid = await this.emailValidator.isValid(Data.email);
       if (!emailIsValid) {
         return BadRequest.invalid(Data.email);
       }
     }
     const newdata = {
       email: Data.email,
       name: Data.name,
       password: Data.password,
     };
     const account = await this.addaccount.add(newdata);

     return {
       account: {
         id: account.id,
         name: account.name,
         email: account.email,
       },
     };
     ;
   }
}


export default SignUpController;
