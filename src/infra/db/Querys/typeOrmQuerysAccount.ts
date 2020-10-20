import {getRepository} from 'typeorm';
import {QueryRepositoryTypes} from './interfaces';
export class Querys implements QueryRepositoryTypes {
 private readonly repo : any
 constructor(entity: any) {
   this.repo = entity;
 }

 async searchRegião(data:any): Promise<any> {
   const Repository = getRepository(this.repo);
   console.log('uem', {data});
   const results: any = await Repository.query(`SELECT * from pubs WHERE localizaçao like "%${data.region}%" LIMIT 10 OFFSET ${data.index}`);
   return results;
 }

 async search(data:any): Promise<any> {
   console.log('doidao', data)
   const Repository = getRepository(this.repo);
   const fields = ['title', 'tecnology', 'informações'];
   const res:any = [];
   for (let i = 0; i < fields.length; i++) {
     const results: any = await Repository.query(`SELECT * from pubs WHERE ${fields[i]} like  "%${data.search}%" LIMIT 10 OFFSET ${data.index}`);
     results.forEach((i:any) => {
       if (res.length === 0) {
         return res.push(i);
       }
       const ids = res.map((e:any) => {
         return e.id;
       });
       if (ids.indexOf(i.id) === -1) {
         res.push(i);
       }
     });
   }
   return res;
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
