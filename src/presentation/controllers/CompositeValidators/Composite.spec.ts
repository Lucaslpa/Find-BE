import CompositeEmailValidator from './Composite.email-validator';
import CompositeFieldCompare from './Composite.fields-compare';
import CompositeFieldRequired from './Composite.fields-required';
import {Error} from '../../../domain/protocols/errors/ProcessError';
import Emailvalidator from '../../../utils/email-valitator/emailvalitador';
import {MinimalCaracteresC} from './Composite.MinCaractere';
import {MinimalCaracteres} from '../../../utils/minmalCaracteres-validator/minimalCaracteres';
const makeComposite = () => {
  const emailvalidator = new Emailvalidator;
  const minimalcaracteresname = new MinimalCaracteres(6);
  const compositeemailvalidator = new CompositeEmailValidator('email', emailvalidator );
  const compositefieldcompare = new CompositeFieldCompare('password', 'passwordConfirm');
  const compositefieldrequired = new CompositeFieldRequired('name');
  const minimalcaracteres = new MinimalCaracteresC('password', minimalcaracteresname );

  return {
    compositeemailvalidator,
    compositefieldrequired,
    compositefieldcompare,
    minimalcaracteres,
  };
};

describe('Composite', () => {
  test('should return email error if composite Email validator error ', () => {
    const {compositeemailvalidator} = makeComposite();
    const data = {
      email: 'luquinhasgmail.com',
    };
    const res = compositeemailvalidator.validate(data);

    expect(res).toEqual(new Error(400).return(` email is invalid`));
  });

  test('should return email error if composite Email validator error ', () => {
    const {compositefieldcompare} = makeComposite();
    const data = {
      password: '213',
      passwordConfirm: '111',
    };
    const res = compositefieldcompare.validate(data);

    expect(res).toEqual(new Error(400).return(`inválid confirm Password`));
  });

  test('should return email error if composite Email validator error ', () => {
    const {compositefieldrequired} = makeComposite();
    const data = {
      email: 'lucas@gmail.com',
      password: '213',
      passwordConfirm: '111',
    };
    const res = compositefieldrequired.validate(data);

    expect(res).toEqual(new Error(400).return(' name not inserted'));
  });

  test('should return error if composite minCaracteres validator error ', () => {
    const {minimalcaracteres} = makeComposite();
    const data = { 
      email: 'lucas@gmail.com',
      password: '23',
    };
    const res = minimalcaracteres.validate(data);

    expect(res).toEqual({
      error: 'Error: password Minimal caracteres invalid ',
      status: 400,
    });
  });
});
