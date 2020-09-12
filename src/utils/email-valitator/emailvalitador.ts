import * as Validator from 'email-validator';
import {ValidatorEmailTypes} from './interfaces';
export default class EmailValidator implements ValidatorEmailTypes {
  isValid(Email: string ): boolean {
    const res = Validator.validate(Email);
    return res;
  }
}


