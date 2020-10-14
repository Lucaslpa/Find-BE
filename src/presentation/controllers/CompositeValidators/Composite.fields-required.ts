import {erro, Error} from '../../../domain/protocols/errors/ProcessError';
import {Validation} from './interfaces';


export default class FieldRequired implements Validation {
             private readonly field : string

             constructor(field: string) {
               this.field = field;
             }

             validate(data: any): undefined | erro {
               if (!data[this.field]) {
                 return new Error(400).return(`${this.field} not inserted`);
               }
             }
}
