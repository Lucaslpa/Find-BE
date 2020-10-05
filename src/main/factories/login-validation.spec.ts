
import ValidationComposite from '../../presentation/controllers/CompositeValidators/Composite.Validation';
import {Validation} from '../../presentation/controllers/CompositeValidators/interfaces';
import FieldRequired from '../../presentation/controllers/CompositeValidators/Composite.fields-required';
import Emailvalidator from '../../utils/email-valitator/emailvalitador';
import EmailValidatorC from '../../presentation/controllers/CompositeValidators/Composite.email-validator';
const emailValidator = new Emailvalidator;

describe('Name of the group', () => {
  test('should ', () => {
    const validators: Validation[] = [];

    for (const fields of ['email', 'password']) {
      validators.push(new FieldRequired(fields));
    }
    validators.push(new EmailValidatorC('email', emailValidator));
  });
});
