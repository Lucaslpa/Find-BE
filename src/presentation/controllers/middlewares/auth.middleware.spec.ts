import {AuthMiddleware} from '../middlewares/auth.middleware';
import {accountmodel} from './MiddlewareAuthInterface';

class LoadAccountTokenStub {
  async load(token: string ): Promise<accountmodel | null> {
    return Promise.resolve({
      id: 20,
      name: 'lucas',
      email: 'lucas@gmail.com',

    });
  }
}

const sut = () => {
  const loadaccountStub = new LoadAccountTokenStub;


  return {
    authmiddleware: new AuthMiddleware(loadaccountStub),
    loadaccountStub,

  };
};


describe('Auth middleware', () => {
  test('should return 401/error if not find token ', async () => {
    const {authmiddleware} = sut();
    const header = {
      token: '',
    };


    const response = await authmiddleware.handle(header.token);
    expect(response).toEqual({status: 401, error: 'Unauthorized'});
  });

  test('should ensure load is called with correct value', async () => {
    const {authmiddleware, loadaccountStub} = sut();
    const spy = jest.spyOn(loadaccountStub, 'load');
    const header= {

      token: 'any_token',

    };
    await authmiddleware.handle(header.token);
    expect(spy).toBeCalledWith(header.token);
  });

  test('if load doesnt return a user return 401/unauthorized', async () => {
    const {authmiddleware, loadaccountStub} = sut();
    jest.spyOn(loadaccountStub, 'load').mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const header = {

      token: 'any_token',

    };


    const res = await authmiddleware.handle(header.token);
    expect(res).toEqual({status: 401, error: 'Unauthorized'});
  });

  test('if load return a user return 200/authorized', async () => {
    const {authmiddleware} = sut();

    const header = {

      token: 'any_token',

    };


    const res = await authmiddleware.handle(header.token);
    expect(res).toEqual({
      status: 200,
      data: {id: 20, name: 'lucas', email: 'lucas@gmail.com'},
    });
  });
});
