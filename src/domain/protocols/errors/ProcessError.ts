export interface erro {
    status: number,
    error: string
}
export class Error {
  constructor( private readonly status: number) {}
  return(erro: string): erro {
    return {
      status: this.status,
      error: erro,
    };
  }
}
