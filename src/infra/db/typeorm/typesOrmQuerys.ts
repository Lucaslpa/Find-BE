import {getRepository} from 'typeorm';
import {QueryRepositoryTypes} from './interfaces';
class QueryRepository implements QueryRepositoryTypes {
 private readonly repo : any
 constructor(repo: any) {
   this.repo = repo;
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
}


export default QueryRepository;
