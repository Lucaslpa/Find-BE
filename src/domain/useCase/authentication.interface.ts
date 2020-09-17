import {error, success} from '../../presentation/controllers/validators/interfaces';

export interface DataLoginReceivedTypes {
     email: string
    password: string
    }

export interface ClassAuthenticate {
      auth(email: string, password: string ): Promise<error | success>
}

