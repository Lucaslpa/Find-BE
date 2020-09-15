import BcryptAdapter from './bcrypt.adapter';
import bcrypt from 'bcrypt';


const makeBcryptAdapter = () => {
  return new BcryptAdapter();
};

describe('Encrypter', () => {
  test('should call bcrypt with correct value', async () => {
    const bcryptadapter = makeBcryptAdapter();

    const spy = jest.spyOn(bcrypt, 'hash');
    await bcryptadapter.encrypt('value');

    expect(spy).toHaveBeenCalledWith('value', 12);
  });

  test(' bcrypt should return a hash value', async () => {
    const bcryptadapter = makeBcryptAdapter();
    jest.spyOn(bcryptadapter, 'encrypt').mockReturnValueOnce(new Promise((resolve) => resolve('hash')));
    const res = await bcryptadapter.encrypt('value');

    expect(res).toBe('hash');
  });


  test(' bcrypt should false if not equal', async () => {
    const bcryptadapter = makeBcryptAdapter();
    jest.spyOn(bcryptadapter, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const res = await bcryptadapter.compare('any', 'any');

    expect(res).toBe(true);
  });
});
