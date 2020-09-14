export interface DataLoginReceivedTypes {
     email: string
    password: string
    }

export interface ClassAuthenticate {
      auth(email: string, password: string ): Promise<string>
}

