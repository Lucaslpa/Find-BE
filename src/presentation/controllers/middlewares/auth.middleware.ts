import {Middleware} from '../../../domain/protocols/middlewares';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import SUCCESS from '../../../domain/protocols/succes/ProcessSucces';
import {error, success} from '../../../presentation/controllers/validators/interfaces';
import {loadaccounttokenTypes} from './MiddlewareAuthInterface';


export class AuthMiddleware implements Middleware {
  constructor( private readonly loadaccounttoken: loadaccounttokenTypes ) {

  }
  async handle(token: string | undefined): Promise<error | success > {
    if (token) {
      const accountOfTokenExist = await this.loadaccounttoken.load(token);
      if (!accountOfTokenExist) {
        return new Promise((resolve) => resolve(new Error(401).return(' Unauthorized')));
      }
      return new SUCCESS(200).return(accountOfTokenExist);
    }

    return new Promise((resolve) => resolve(new Error(401).return(' Unauthorized'))); ;
  }
}
