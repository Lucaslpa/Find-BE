import SignUpController from './SignUp';

describe('Login', () => {
  test('should register with success/400 status', () => {
    const controll = new SignUpController;
    const data = {
      email: 'email@gmail.com',
      password: 'password',
      passwordConfirm: 'Password',
    };
    const res = controll.signUp(data);
    expect(res.status).toBe(400);
  });
});
