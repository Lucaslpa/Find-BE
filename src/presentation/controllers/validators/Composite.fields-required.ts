import Error from '../../../domain/protocols/errors/ProcessError';
import {Validation, error} from './interfaces';


export default class FieldRequired implements Validation {
             private readonly field : string

             constructor(field: string) {
               this.field = field;
             }

             validate(data: any): undefined | error {
               if (!data[this.field]) {
                 return new Error().return(`missing param ${this.field}`);
               }
             }
}
