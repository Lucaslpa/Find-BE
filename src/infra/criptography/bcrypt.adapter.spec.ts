import BcryptAdapter from './bcrypt.adapter';
import bcrypt from 'bcrypt';

describe('Encrypter', () => {
  test('should call bcrypt with correct value', async () => {
    const bcryptadapter = new BcryptAdapter;

    const spy = jest.spyOn(bcrypt, 'hash');
    await bcryptadapter.encrypt('value');

    expect(spy).toHaveBeenCalledWith('value', 12);
  });
});
