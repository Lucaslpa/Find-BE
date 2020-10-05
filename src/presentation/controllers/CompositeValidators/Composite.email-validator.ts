import {Error} from '../../../domain/protocols/errors/ProcessError';
import {Validation, error} from './interfaces';
import {ValidatorEmailTypes} from '../SignUpController/interfaces';


export default class emailValidator implements Validation {
             private readonly field : string
             private readonly emailValidator: ValidatorEmailTypes

             constructor(fieldName: string, emailValidator: ValidatorEmailTypes) {
               this.field = fieldName;
               this.emailValidator = emailValidator;
             }

             validate(data: any): undefined | error {
               const emailIsValid = this.emailValidator.isValid(data[this.field]);
               if (!emailIsValid) {
                 return new Error(400).return(` ${this.field} is invalid`);
               }
             }
}
