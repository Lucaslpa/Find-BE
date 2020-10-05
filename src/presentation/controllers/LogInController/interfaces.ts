import {error, success} from '../CompositeValidators/interfaces';
export interface accountLoginTypes {
             email?: string,
            password?: string

    }

export interface accountLoginResponse {

          body?: any,
          error?: string
}

export interface LoginControllerTypes {
    login(accountLogin: accountLoginTypes ): Promise<error| success>
}
