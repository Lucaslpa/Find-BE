export {} from '../../../';
import {publish} from '../../../domain/useCase/publish.interfaace';

export class PublishController {
  constructor(
         private readonly publish: publish,
  ) {}
  async pub(data: any ) {

    console.log(data)
    const fields = [
      'token',
      'title',
      'companyName',
      'tecnology',
      'informações',
      'contato',
      'preço',
      'localizaçao',
      'typo'];

    for (const field of fields ) {
      if (!data[field]) {
        return {
          status: 400,
          body: `${field} não inserido`,
        };
      }
    }

    const res = await this.publish.pub(data);

    if (res.id) {
      return {
        status: 200,
        body: `Publicado com sucesso.`,
      };
    }

    return {
      status: 500,
      body: 'Something wrong',
    };
  }
}
