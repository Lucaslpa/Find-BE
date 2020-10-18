import {getRepository} from 'typeorm';
import {QueryRepositoryTypes} from './interfaces';
export class Querys implements QueryRepositoryTypes {
 private readonly repo : any
 constructor(entity: any) {
   this.repo = entity;
 }
 async getAll(data:any): Promise<any> {
   const Repository = getRepository(this.repo);
   const res = await Repository.find({skip: data, take: 10});
   return res;
 }

 async get(Data: any): Promise<any> {
   const Repository = getRepository(this.repo);
   const res = await Repository.findOne({where: {
     email: Data,
   }});

   return res;
 }
 async create(Data: any): Promise<any> {
   const Repository = await getRepository(this.repo);
   const res = await Repository.insert(Data);
   if (res.identifiers[0]) {
     return {
       id: res.identifiers[0],
       ...Data,
     };
   }
   return Promise.resolve(res);
 }

 async edit(data: any ): Promise<any> {
   const Repository = await getRepository(this.repo);
   const account = await Repository.query(`UPDATE account
   SET ${data.modifie.editField} = '${data.modifie.dataEditField}'
   WHERE email = '${data.email}'`);
   return account;
 }
}
