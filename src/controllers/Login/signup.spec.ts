import SignUpController from './SignUp';

describe('Login', () => {
  test('Should return erro/400 status if without name', () => {
    const controll = new SignUpController;
    const data = {
      email: 'email@gmail.com',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: name`);
  });

  test('Should return erro/400 status if without email', () => {
    const controll = new SignUpController;
    const data = {
      name: 'namehere',
      password: 'password',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: email`);
  });

  test('Should return erro/400 status if without password', () => {
    const controll = new SignUpController;
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      passwordConfirm: 'password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: password`);
  });

  test('Should return erro/400 status if without passwordConfirm', () => {
    const controll = new SignUpController;
    const data = {
      name: 'namehere',
      email: 'email@gmail.com',
      password: 'password',

    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
    expect(res.error).toEqual(`missing: passwordConfirm`);
  });
});
