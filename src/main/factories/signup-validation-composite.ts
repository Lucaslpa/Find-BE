
import ValidationComposite from '../../presentation/controllers/CompositeValidators/Composite.Validation';
import {Validation} from '../../presentation/controllers/CompositeValidators/interfaces';
import FieldRequired from '../../presentation/controllers/CompositeValidators/Composite.fields-required';
import FieldCompare from '../../presentation/controllers/CompositeValidators/Composite.fields-compare';
import Emailvalidator from '../../utils/email-valitator/emailvalitador';
import EmailValidator from '../../presentation/controllers/CompositeValidators/Composite.email-validator';
const emailValidator = new Emailvalidator;

const SignUpValidatioComposite = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const fields of ['name', 'email', 'password', 'passwordConfirm']) {
    validations.push(new FieldRequired(fields));
  }
  validations.push(new FieldCompare('password', 'passwordConfirm'));
  validations.push(new EmailValidator('email', emailValidator));

  return new ValidationComposite(validations);
};


export default SignUpValidatioComposite;
