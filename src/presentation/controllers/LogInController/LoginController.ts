import {accountLoginTypes, LoginControllerTypes, accountLoginResponse} from './interfaces';
import ERROR from '../../../domain/protocols/errors/ProcessError';
import SUCCES from '../../../domain/protocols/succes/ProcessSucces';
import {ValidatorEmailTypes} from '../../../utils/email-valitator/interfaces';
import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';

class LoginController implements LoginControllerTypes {
   private readonly emailvalidator: ValidatorEmailTypes
   private readonly auth
   constructor(emailvalidator: ValidatorEmailTypes, auth: ClassAuthenticate ) {
     this.emailvalidator = emailvalidator;
     this.auth = auth;
   }

   async login(accountLogin: accountLoginTypes ): Promise<accountLoginResponse> {
     try {
       const fields = [accountLogin.body.email, accountLogin.body.password];
       const {email, password} = accountLogin.body;
       const fieldsName = ['email', 'password'];
       for ( let i = 0; i < fields.length; i++) {
         const field = fields[i];
         if (!field) {
           return new ERROR().return(` ${fieldsName[i]} not inserted`);
         }
       }
       if (email) {
         const isValid = await this.emailvalidator.isValid(email);
         if (!isValid) {
           return new ERROR().return(' Email is invalid');
         }
       }

       let token = null;
       if (email && password) {
         token = await this.auth.auth(email, password);
         if (!token) {
           return new ERROR().return(' Unauthorized');
         }
       }

       return new SUCCES().return(token);
     } catch (error) {
       return new ERROR().return(`${error}`);
     }
   }
}


export default LoginController;
