export interface Edit {
    update: string,
    where: string,
    set: string,
 }

export interface QueryRepositoryTypes {
    searchRegião(data:any): Promise<any>
    search(data:any): Promise<any>
    create(Data: any): Promise<any>
    get(Data: any): Promise<any>
    edit(data: any ): Promise<any>
    getAll(data:any): Promise<any>
}
