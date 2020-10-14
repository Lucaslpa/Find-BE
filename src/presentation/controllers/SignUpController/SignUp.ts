import {SignUpTypesRequest, SignUpControllerTypes,
  AddAccountType, SignUpTypesResponse,
} from './interfaces';
import {Validation} from '../CompositeValidators/interfaces';


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
     const account = await this.addaccount.add(Data);

     return {
       status: 200,
       body: {
         id: account.id,
         name: account.name,
         email: account.email,
       },
     };
     ;
   }
}


export default SignUpController;
