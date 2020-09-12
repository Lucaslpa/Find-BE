export interface accountLoginTypes {

   body: { email?: string,
            password?: string
       }
    }


export interface LoginControllerTypes {
    login(accountLogin: accountLoginTypes ): any
}
