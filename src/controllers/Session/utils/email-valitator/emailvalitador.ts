import * as Validator from 'email-validator';
 interface ValidatorEmailTypes {
    isValid(Email: string): boolean
  }

class EmailValidator implements ValidatorEmailTypes {
  isValid(Email: string ): boolean {
    const res = Validator.validate(Email);
    return res;
  }
}

export default EmailValidator;
