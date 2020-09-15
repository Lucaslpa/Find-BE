
import ValidationComposite from '../../presentation/controllers/validators/Composite.Validation';
import {Validation} from '../../presentation/controllers/validators/interfaces';
import FieldRequired from '../../presentation/controllers/validators/Composite.fields-required';
import FieldCompare from '../../presentation/controllers/validators/Composite.fields-compare';
import Emailvalidator from '../../utils/email-valitator/emailvalitador';
import EmailValidator from '../../presentation/controllers/validators/Composite.email-validator';
const validate = new Emailvalidator;

const SignUpValidatioComposite = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const fields of ['name', 'email', 'password', 'passwordConfirm']) {
    validations.push(new FieldRequired(fields));
  }
  validations.push(new FieldCompare('password', 'passwordConfirm'));
  validations.push(new EmailValidator('email', validate));

  return new ValidationComposite(validations);
};


export default SignUpValidatioComposite;
