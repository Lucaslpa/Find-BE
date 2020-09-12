import {accountLoginTypes, LoginControllerTypes} from './interfaces';
import ERROR from '../../../domain/protocols/errors/ProcessError';
import SUCCES from '../../../domain/protocols/succes/ProcessSucces';
import {ValidatorEmailTypes} from '../../../utils/email-valitator/interfaces';


class LoginController implements LoginControllerTypes {
   private readonly emailvalidator: ValidatorEmailTypes
   constructor(emailvalidator: ValidatorEmailTypes) {
     this.emailvalidator = emailvalidator;
   }

   async login(accountLogin: accountLoginTypes ): Promise<any> {
     const fields = [accountLogin.body.email, accountLogin.body.password];
     const {email} = accountLogin.body;
     const fieldsName = ['email', 'password'];

     for ( let i = 0; i < fields.length; i++) {
       const field = fields[i];
       if (!field) {
         return new ERROR().returnError(` ${fieldsName[i]} not inserted`);
       }
     }
     if (email) {
       const isValid = await this.emailvalidator.isValid(email);
       if (!isValid) {
         return new ERROR().returnError(' Email is invalid');
       }
     }
   }
}


export default LoginController;
