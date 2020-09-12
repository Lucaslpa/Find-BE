export default class Error {
  returnError(erro: string) {
    return {
      status: 400,
      error: `Error:${erro}`,
    };
  }
}
