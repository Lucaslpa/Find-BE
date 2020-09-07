import EmailValidator from './emailvalitador';

function makeValidator() {
  const emailvalidator = new EmailValidator;
  return {
    emailvalidator,
  };
}

describe('Email validator', () => {
  test('should return false if email is false ', () => {
    const {emailvalidator} = makeValidator();
    jest.spyOn(emailvalidator, 'isValid').mockReturnValueOnce(false);
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = emailvalidator.isValid(data.email);
    expect(res).toEqual(false);
  });

  test('should return true if email is true', () => {
    const {emailvalidator} = makeValidator();
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = emailvalidator.isValid(data.email);
    expect(res).toEqual(true);
  });
});
