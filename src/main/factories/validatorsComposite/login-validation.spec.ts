
import {CompositeValidation} from '../../../presentation/controllers/CompositeValidators/Composite.Validation';
import {Validation} from '../../../presentation/controllers/CompositeValidators/interfaces';
import FieldRequired from '../../../presentation/controllers/CompositeValidators/Composite.fields-required';
import Emailvalidator from '../../../utils/email-valitator/emailvalitador';
import EmailValidatorC from '../../../presentation/controllers/CompositeValidators/Composite.email-validator';
import {MinimalCaracteresC} from '../../../presentation/controllers/CompositeValidators/Composite.MinCaractere';
import {MinimalCaracteres} from '../../../utils/minmalCaracteres-validator/minimalCaracteres';
import loginFactory from '../controllers/LoginFactory';
const emailValidator = new Emailvalidator;
const minimalcaracteresname = new MinimalCaracteres(3);
jest.mock('../../../presentation/controllers/CompositeValidators/Composite.Validation');

describe('login validation', () => {
  test('should ensure Composite validation is called with correct value', () => {
    const validators: Validation[] = [];
    for (const fields of ['email', 'password']) {
      validators.push(new FieldRequired(fields));
    }

    validators.push(new EmailValidatorC('email', emailValidator));
    validators.push(new MinimalCaracteresC('password', minimalcaracteresname ));
    loginFactory();
    expect(CompositeValidation).toHaveBeenCalledWith(validators);
  });
});
