export enum editfields {
    password = 'password',
    email = 'email',
    name = 'name'

}

export interface account {

}

export interface dataAccountupdate {
    email: string
    modifie : {
         editField: editfields,
         dataEditField: string
    }
}
export interface updateAccount {
    editPassword(data: dataAccount ): Promise<any>
}
export interface dataAccount {
    email: string
    modifie : string
}
