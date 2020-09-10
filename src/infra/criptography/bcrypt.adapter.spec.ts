import BcryptAdapter from './bcrypt.adapter';
import bcrypt from 'bcrypt';
jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
}));

describe('Encrypter', () => {
  test('should call bcrypt with correct value', async () => {
    const bcryptadapter = new BcryptAdapter;

    const spy = jest.spyOn(bcrypt, 'hash');
    await bcryptadapter.encrypt('value');

    expect(spy).toHaveBeenCalledWith('value', 12);
  });

  test(' bcrypt should return a hash value', async () => {
    const bcryptadapter = new BcryptAdapter;

    const res = await bcryptadapter.encrypt('value');

    expect(res).toBe('hash');
  });
});
