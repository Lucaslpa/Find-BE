export interface contentData {
     from: string,
       to: string,
       subject: string,
       text: string,
       html: string
   }
export interface accountsendEmailConfig {
     host: string,
      port: number,
      secure: boolean,
      auth: {
        user: string,
        pass: string,
      },
}
export interface transporterAdapter {
     send(content: contentData ): Promise<any>
}
