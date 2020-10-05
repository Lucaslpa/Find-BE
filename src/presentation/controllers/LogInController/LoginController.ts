import {accountLoginTypes, LoginControllerTypes} from './interfaces';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import {ValidatorEmailTypes} from '../../../utils/email-valitator/interfaces';
import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import {error, success} from '../CompositeValidators/interfaces';


class LoginController implements LoginControllerTypes {
   private readonly emailvalidator: ValidatorEmailTypes
   private readonly auth
   constructor(emailvalidator: ValidatorEmailTypes, auth: ClassAuthenticate ) {
     this.emailvalidator = emailvalidator;
     this.auth = auth;
   }

   async login(accountLogin: accountLoginTypes ): Promise<error| success> {
     try {
       const fields = [accountLogin.email, accountLogin.password];
       const {email, password} = accountLogin;
       const fieldsName = ['email', 'password'];
       for ( let i = 0; i < fields.length; i++) {
         const field = fields[i];
         if (!field) {
           return new Error(400).return(` ${fieldsName[i]} not inserted`);
         }
       }
       if (email) {
         const isValid = await this.emailvalidator.isValid(email);
         if (!isValid) {
           return new Error(400).return(' Email is invalid');
         }
       }
       let token: error | success;
       if (email && password) {
         token = await this.auth.auth(email, password);
         if (token.status === 500) {
           return new Error(401).return(' Unauthorized');
         }
       }
       return new Promise((resolve) => resolve(token));
     } catch (error) {
       return new Error(500).return(`${error}`);
     }
   }
}


export default LoginController;
