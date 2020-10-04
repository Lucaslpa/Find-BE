import {Error} from '../../../domain/protocols/errors/ProcessError';
import {Validation, error} from './interfaces';


export default class FieldCompare implements Validation {
             private readonly field : string
             private readonly fieldtocompare : string

             constructor(fieldName: string, fieldToCompare: string) {
               this.field = fieldName;
               this.fieldtocompare = fieldToCompare;
             }

             validate(data: any): undefined | error {
               if (data[this.field] !== data[this.fieldtocompare]) {
                 return new Error(400).return(`inválid confirm Password`);
               }
             }
}
