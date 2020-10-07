import {getRepository} from 'typeorm';
import {QueryRepositoryTypes} from './interfaces';
export class Querys implements QueryRepositoryTypes {
 private readonly repo : any
 constructor(entity: any) {
   this.repo = entity;
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
   SET password = '${data.password}'
   WHERE email = '${data.email}'`);
   console.log('return ', account);
   return account;
 }
}
