import {ClassAuthenticate} from '../../../domain/useCase/authentication.interface';
import {DBrepositoryQuerys, loadTokenType, CompareType} from '../../interfaces';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import {error, success} from '../../../presentation/controllers/CompositeValidators/interfaces';
import Success from '../../../domain/protocols/succes/ProcessSucces';

export default class Authenticade implements ClassAuthenticate {
 private readonly dbrepo: DBrepositoryQuerys
 private readonly tokengenerator: loadTokenType
 private readonly compare: CompareType
 constructor(dbrepo: DBrepositoryQuerys, tokengeneretor: loadTokenType, compare: CompareType ) {
   this.dbrepo = dbrepo;
   this.tokengenerator = tokengeneretor;
   this.compare = compare;
 }

 async auth(email: string, password: string ): Promise<error | success> {
   const account = await this.dbrepo.getOfDb(email);
   if (!account) {
     return new Error(400).return('Invalid email/password');
   }
   const isEqual = await this.compare.compare(password, account.password);

   if (!isEqual) {
     return new Error(400).return('Invalid email/password');
   }
   const dataToToken = {
     id: String(account.id),
     email: account.email,
     name: account.name,
   };
   const token = await this.tokengenerator.loadToken(dataToToken);
   if (!token) {
     return new Error(500).return('Something is Wrong');
   }

   return new Success(200).return({
     token,
     name: account.name,
   });
 }
}
