import jwt from 'jsonwebtoken';
import {LoadToken} from './jwtokenLoadTokenAdapter';
import JwtDecodeToken from './jwtokenDecodeTokenAdapter';
import PrivateKey from '../../../.authenticateKey';
jest.mock('jsonwebtoken', () => ({
  async sign() : Promise<string> {
    return new Promise((resolve) => resolve('any_value'));
  },

  async verify(token: string) : Promise<string> {
    return new Promise((resolve) => resolve(''));
  },
}
));

describe('jwtoken', () => {
  test('should call jwt encrypt with correct values ', () => {
    const jwtokenadapter = new LoadToken('private_key');
    const spy = jest.spyOn(jwt, 'sign');
    jwtokenadapter.loadToken('any_value');

    expect(spy).toHaveBeenCalledWith({id: 'any_value'}, 'private_key');
  });

  test('should return error if load tokens fail', async () => {
    const jwtokenadapter = new LoadToken('private_key');
    const token = await jwtokenadapter.loadToken('any_value');

    expect(token).toEqual('any_value');
  });

  test('should return error decode tokens fail', async () => {
    const jwtokenadapter = new JwtDecodeToken(PrivateKey);
    const token = await jwtokenadapter.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyOSIsImlhdCI6MTYwMDQ3MjIzNX0.s3FDw7YY2FlLeBg542vIgM24v_yPen595QR54VnSVVY');
    expect(token).toEqual({'error': 'Error: Unauthorized', 'status': 401});
  });
});
