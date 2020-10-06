export interface transporterAdapter {
     send(email: string ): Promise<any>
}
