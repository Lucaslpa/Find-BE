import ValidationComposite from '../../presentation/controllers/CompositeValidators/Composite.Validation';
import signUpCompositeValidation from './signup-validation-composite';
import {Validation} from '../../presentation/controllers/CompositeValidators/interfaces';
import FieldRequired from '../../presentation/controllers/CompositeValidators/Composite.fields-required';
import FieldCompare from '../../presentation/controllers/CompositeValidators/Composite.fields-compare';
import EmailValidator from '../../presentation/controllers/CompositeValidators/Composite.email-validator';
import Emailvalidator from '../../utils/email-valitator/emailvalitador';

jest.mock('../../presentation/controllers/validators/Composite.Validation');
const validate = new Emailvalidator;

describe('Sign Up validation composite ', () => {
  test('should validation composite with all values ', () => {
    const validations: Validation[] = [];

    signUpCompositeValidation();

    for (const fields of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new FieldRequired(fields));
    }

    validations.push(new FieldCompare('password', 'passwordConfirm'));
    validations.push(new EmailValidator('email', validate));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
