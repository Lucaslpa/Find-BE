export default class Error {
  constructor( private readonly status: number) {}
  return(erro: string) {
    return {
      status: this.status,
      error: `Error:${erro}`,
    };
  }
}
