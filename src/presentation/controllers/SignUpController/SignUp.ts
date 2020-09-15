import {SignUpTypesRequest, SignUpControllerTypes,
  AddAccountType, SignUpTypesResponse,
} from './interfaces';
import {Validation} from '../validators/interfaces';


class SignUpController implements SignUpControllerTypes {
   private readonly addaccount: AddAccountType
   private readonly validation: Validation

   constructor( addaccount: AddAccountType, validator: Validation) {
     this.validation = validator;
     this.addaccount = addaccount;
   }
   async signUp(Data: SignUpTypesRequest): Promise<SignUpTypesResponse> {
     const errortest = this.validation.validate(Data);
     if (errortest) {
       return errortest;
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
