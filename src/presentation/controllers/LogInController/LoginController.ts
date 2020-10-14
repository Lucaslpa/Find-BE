import {accountLoginTypes, LoginControllerTypes} from './interfaces';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import {error, success} from '../CompositeValidators/interfaces';
import {Validation} from '../CompositeValidators/interfaces';


class LoginController implements LoginControllerTypes {
   private readonly validators : Validation
   private readonly auth
   constructor(validators: Validation, auth: ClassAuthenticate ) {
     this.validators = validators;
     this.auth = auth;
   }

   async login(accountLogin: accountLoginTypes ): Promise<error| success> {
     try {
       const {email, password} = accountLogin;
       const validation = this.validators.validate(accountLogin);
       if (validation) {
         return validation;
       }

       let token: error | success;
       if (email && password) {
         token = await this.auth.auth(email, password);
         if (token.status === 401) {
           return new Error(401).return('Unauthorized');
         }
       }
       return new Promise((resolve) => resolve(token));
     } catch (error) {
       return new Error(500).return(`${error}`);
     }
   }
}


export default LoginController;
