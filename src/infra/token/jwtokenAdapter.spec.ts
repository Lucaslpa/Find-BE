import jwt from 'jsonwebtoken';
import JwtokenAdapter from './jwtokenAdapter';

jest.mock('jsonwebtoken', () => ({
  async sign() : Promise<string> {
    return new Promise((resolve) => resolve('any_value'));
  }}

));

describe('jwtoken', () => {
  test('should call jwt encrypt with correct values ', () => {
    const jwtokenadapter = new JwtokenAdapter('private_key');
    const spy = jest.spyOn(jwt, 'sign');
    jwtokenadapter.loadToken('any_value');

    expect(spy).toHaveBeenCalledWith({id: 'any_value'}, 'private_key');
  });

  test('should return error if tokens fail', async () => {
    const jwtokenadapter = new JwtokenAdapter('private_key');
    const token = await jwtokenadapter.loadToken('any_value');

    expect(token).toEqual('any_value');
  });
});
