import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import {DBrepoType, TokenGeneratorType} from '../../interfaces';
import Error from '../../../domain/protocols/errors/ProcessError';
import {error} from '../../../presentation/controllers/validators/interfaces';


export default class Authenticade implements ClassAuthenticate {
 private readonly dbrepo: DBrepoType
 private readonly tokengenerator: TokenGeneratorType
 constructor(dbrepo: DBrepoType, tokengeneretor: TokenGeneratorType ) {
   this.dbrepo = dbrepo;
   this.tokengenerator = tokengeneretor;
 }

 async auth(email: string, password: string ): Promise<string | error> {
   const account = await this.dbrepo.loadAccount(email);

   if (!account) {
     return new Error().return(' Invalid email/password');
   }
   if (account.password !== password) {
     return new Error().return(' Invalid email/password');
   }

   const token = this.tokengenerator.loadToken(account);
   if (!token) {
     return new Error().return(' Something is Wrong');
   }

   return '';
 }
}
