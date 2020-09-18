import {Middleware} from '../../../domain/protocols/middlewares';
import ERROR from '../../../domain/protocols/errors/ProcessError';


export class AuthMiddleware implements Middleware {
  handle(req: any): any {
    return new ERROR(401).return(' Unauthorized');
  }
}
