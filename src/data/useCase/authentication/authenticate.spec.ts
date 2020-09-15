import Authenticate from './authenticate';
import {DataAccountTypesRes} from '../../interfaces';

import Error from '../../../domain/protocols/errors/ProcessError';

const token = () => {
  class Token {
    async loadToken(data: DataAccountTypesRes) : Promise<string> {
      return '34242342342423523';
    }
  }

  return new Token;
};

const dbRepo = () => {
  class DBrepo {
    async loadAccount(email: string): Promise<DataAccountTypesRes | undefined> {
      return {
        id: 10,
        name: 'lucas',
        email: 'lucas@gmail.com',
        password: '222',
      };
    }
  }
  return new DBrepo;
};
const makeAuthenticate = () => {
  const tokenGenerator = token();
  const dbrepo = dbRepo();
  const authenticate = new Authenticate(dbrepo, tokenGenerator);
  return {
    authenticate,
    dbrepo,
    tokenGenerator,
  };
};

describe('authenticate', () => {
  test('should with correct data ', async () => {
    const {authenticate} = makeAuthenticate();
    const data = {
      email: 'lucas@gmail',
      password: '1234',
    };
    const spy = spyOn(authenticate, 'auth');
    await authenticate.auth(data.email, data.password);
    expect(spy).toHaveBeenCalledWith(data.email, data.password);
  });
  test('should return error if  password not combine', async () => {
    const {authenticate} = makeAuthenticate();
    const data = {
      email: 'lucas@gmail',
      password: '2222',
    };

    const res = await authenticate.auth(data.email, data.password);
    expect(res).toEqual(new Error().return(' Invalid email/password'));
  });


  test('should return a token', async () => {
    const {authenticate} = makeAuthenticate();
    const data = {
      email: 'lucas@gmail',
      password: '2222',
    };

    const res = await authenticate.auth(data.email, data.password);
    expect(res).toEqual(new Error().return(' Invalid email/password'));
  });

  test('Ensure loadToken be called with correct data', async () => {
    const {authenticate, tokenGenerator} = makeAuthenticate();

    const spy = jest.spyOn(tokenGenerator, 'loadToken');
    const data = {
      email: 'lucas@gmail',
      password: '222',
    };

    await authenticate.auth(data.email, data.password);
    expect(spy).toHaveBeenCalledWith({
      id: 10,
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: '222',
    });
  });
});
