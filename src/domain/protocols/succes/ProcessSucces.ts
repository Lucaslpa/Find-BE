export default class Succes {
    private readonly succes : string
    constructor(Succes: string ) {
      this.succes = Succes;
    }

    erroInvalid(Succes: string) {
      return {
        status: 200,
        body: Succes,

      };
    }
}
