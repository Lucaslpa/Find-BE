
export interface data {
    account: string,
    title : string
    companyName: string
    tecnology: string
    informações: string
    contato: string
    preço: string
    localizaçao: string
    typo: string,
    presencialOuRemoto: string
}
export interface pubsrepo {
    addToDB(data: data): Promise<any>
    getOfDB(index: number): Promise<[{}]>
    searchOfDB(index:number, search:string): Promise<[{}]>
    searchRegionOfDB(index:number, region:string): Promise<[{}]>
}
