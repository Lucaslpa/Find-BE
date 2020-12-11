export interface data {
    token: string
    title : string
    companyName: string
    tecnology: string
    informações: string
    contato: string
    preço: string
    localizaçao: string
    typo: string
    presencialOuRemoto: string
}

export interface publish {
     pub(data: data ): Promise<any>
}
