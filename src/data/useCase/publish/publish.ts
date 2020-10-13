
import {data, publish} from './../../../domain/useCase/publish.interfaace';
import {pubsrepo} from '../../../domain/repos/pubsRepo';

export class Publish implements publish {
  constructor(
     private readonly dbrepo: pubsrepo,
  ) {}
  async pub(data: data ): Promise<any> {
    this.dbrepo.addToDB(data);
    return;
  }
}
