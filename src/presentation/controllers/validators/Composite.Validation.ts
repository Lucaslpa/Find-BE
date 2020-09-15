import {Validation, error} from './interfaces';


export default class CompositeValidation implements Validation {
     private readonly validation : Validation[]
     constructor(validation: Validation[]) {
       this.validation = validation;
     }

     validate(data: any): undefined | error {
       for (const validator of this.validation) {
         const error = validator.validate(data);
         if (error) {
           return error;
         }
       }
     }
}
