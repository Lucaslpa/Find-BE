import {error, success} from '../../presentation/controllers/validators/interfaces';


export interface Middleware {
     handle(req: string): Promise<error | success >
}
