
import {CompositeValidation} from '../../../presentation/controllers/CompositeValidators/Composite.Validation';
import {Validation} from '../../../presentation/controllers/CompositeValidators/interfaces';
import FieldRequired from '../../../presentation/controllers/CompositeValidators/Composite.fields-required';
import Emailvalidator from '../../../utils/email-valitator/emailvalitador';
import EmailValidatorC from '../../../presentation/controllers/CompositeValidators/Composite.email-validator';
import {MinimalCaracteresC} from '../../../presentation/controllers/CompositeValidators/Composite.MinCaractere';
import {MinimalCaracteres} from '../../../utils/minmalCaracteres-validator/minimalCaracteres';


const emailValidator = new Emailvalidator;
const minimalcaracteresname = new MinimalCaracteres(3);


export const loginValidatioComposite = (): CompositeValidation => {
  const validators: Validation[] = [];

  for (const fields of ['email', 'password']) {
    validators.push(new FieldRequired(fields));
  }
  validators.push(new EmailValidatorC('email', emailValidator));
  validators.push(new MinimalCaracteresC('password', minimalcaracteresname ));

  return new CompositeValidation(validators);
};


