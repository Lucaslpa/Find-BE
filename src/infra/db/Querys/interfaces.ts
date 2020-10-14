export interface Edit {
    update: string,
    where: string,
    set: string,
 }

export interface QueryRepositoryTypes {
    create(Data: any): Promise<any>
    get(Data: any): Promise<any>
    edit(data: any ): Promise<any>
    getAll(): Promise<any>
}
