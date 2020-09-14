export interface accountLoginTypes {
   body: { email?: string,
            password?: string
       }
    }

export interface accountLoginResponse {
        status: number
        body?: any,
        error?: string
}

export interface LoginControllerTypes {
    login(accountLogin: accountLoginTypes ): Promise<accountLoginResponse>
}
