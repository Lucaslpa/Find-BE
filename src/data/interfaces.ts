export interface encrypt {
    encrypt(password: string): Promise<string>
}

export interface DataAccountTypes {
   name: string,
   email: string,
   password: string
}


export interface DataAccountTypesRes {
    id: number,
    name: string,
    email: string,
    password: string
 }

export interface AddAccountRepositoryTypes {
    addToDB(Account: DataAccountTypes): Promise<DataAccountTypesRes>
 }
