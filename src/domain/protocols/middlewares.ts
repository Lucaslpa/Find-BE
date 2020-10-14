import {error, success} from '../../presentation/controllers/CompositeValidators/interfaces';


export interface Middleware {
     handle(req: string): Promise<error | success >
}
