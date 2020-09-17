import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import {DBrepoType, TokenGeneratorType, CompareType} from '../../interfaces';
import Error from '../../../domain/protocols/errors/ProcessError';
import {error, success} from '../../../presentation/controllers/validators/interfaces';
import Success from '../../../domain/protocols/succes/ProcessSucces';

export default class Authenticade implements ClassAuthenticate {
 private readonly dbrepo: DBrepoType
 private readonly tokengenerator: TokenGeneratorType
 private readonly compare: CompareType
 constructor(dbrepo: DBrepoType, tokengeneretor: TokenGeneratorType, compare: CompareType ) {
   this.dbrepo = dbrepo;
   this.tokengenerator = tokengeneretor;
   this.compare = compare;
 }

 async auth(email: string, password: string ): Promise<error | success> {
   const account = await this.dbrepo.getOfDb(email);
   if (!account) {
     return new Error().return(' Invalid email/password');
   }
   const isEqual = await this.compare.compare(password, account.password);

   if (!isEqual) {
     return new Error().return(' Invalid email/password');
   }

   const token = await this.tokengenerator.loadToken(String(account.id));
   if (!token) {
     return new Error().return(' Something is Wrong');
   }
   return new Success().return(token);
 }
}
