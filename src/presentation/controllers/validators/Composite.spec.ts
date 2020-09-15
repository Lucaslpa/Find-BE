import CompositeEmailValidator from './Composite.email-validator';
import CompositeFieldCompare from './Composite.fields-compare';
import CompositeFieldRequired from './Composite.fields-required';
import Error from '../../../domain/protocols/errors/ProcessError';
import Emailvalidator from '../../../utils/email-valitator/emailvalitador';
const makeComposite = () => {
  const emailvalidator = new Emailvalidator;
  const compositeemailvalidator = new CompositeEmailValidator('email', emailvalidator );
  const compositefieldcompare = new CompositeFieldCompare('password', 'passwordConfirm');
  const compositefieldrequired = new CompositeFieldRequired('name');

  return {
    compositeemailvalidator,
    compositefieldrequired,
    compositefieldcompare,
  };
};

describe('Composite', () => {
  test('should return email error if composite Email validator error ', () => {
    const {compositeemailvalidator} = makeComposite();
    const data = {
      email: 'luquinhasgmail.com',
    };
    const res = compositeemailvalidator.validate(data);

    expect(res).toEqual(new Error().return(`invalid email`));
  });

  test('should return email error if composite Email validator error ', () => {
    const {compositefieldcompare} = makeComposite();
    const data = {
      pssword: '213',
      passwordConfirm: '111',
    };
    const res = compositefieldcompare.validate(data);

    expect(res).toEqual(new Error().return(`inválid confirm Password`));
  });

  test('should return email error if composite Email validator error ', () => {
    const {compositefieldrequired} = makeComposite();
    const data = {
      email: 'luca@gmail.com',
      pssword: '213',
      passwordConfirm: '111',
    };
    const res = compositefieldrequired.validate(data);

    expect(res).toEqual(new Error().return(`missing param name`));
  });
});
