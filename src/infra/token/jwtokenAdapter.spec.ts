import jwt from 'jsonwebtoken';
import {LoadToken} from './jwtokenLoadTokenAdapter';
import JwtDecodeToken from './jwtokenVerifyTokenAdapter';
import {DecodeToken} from './jwtDecode';
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

const data = {
  id: 'any_id',
  email: 'any_email',
  name: 'any_name',
};

describe('jwtoken', () => {
  test('should call jwt encrypt with correct values ', () => {
    const jwtokenadapter = new LoadToken('private_key');

    const spy = jest.spyOn(jwt, 'sign');
    jwtokenadapter.loadToken(data);

    expect(spy).toHaveBeenCalledWith(data, 'private_key');
  });

  test('should return error if load tokens fail', async () => {
    const jwtokenadapter = new LoadToken('private_key');

    const token = await jwtokenadapter.loadToken(data);
    expect(token).toEqual('any_value');
  });

  test('should return error decode tokens fail', async () => {
    const jwtokenadapter = new JwtDecodeToken(PrivateKey);
    const token = await jwtokenadapter.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyOSIsImlhdCI6MTYwMDQ3MjIzNX0.s3FDw7YY2FlLeBg542vIgM24v_yPen595QR54VnSVVY');
    expect(token).toEqual({'error': 'Unauthorized', 'status': 401});
  });

  test('should decode a token', async () => {
    const jwtokenadapter = new DecodeToken;
    const infos = await jwtokenadapter.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFsdWNhc2xwYTEyMzQ1QGdtYWlsLmNvbSIsImVtYWlsIjoiMTAzMCIsImlhdCI6MTYwMjExOTMyN30.jLtQYZeDSNi0aEpmzRBvr122ff1YhJLTcUupk0m-NjA');
    expect(infos.id).toBeTruthy();
    expect(infos.email).toBeTruthy();
  });
});
