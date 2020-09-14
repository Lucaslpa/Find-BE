export default class Error {
  return(erro: string) {
    return {
      status: 400,
      error: `Error:${erro}`,
    };
  }
}
