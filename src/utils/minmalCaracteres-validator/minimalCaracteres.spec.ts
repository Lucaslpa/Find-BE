import {MinimalCaracteres} from './minimalCaracteres';
describe('MinimalCaracteres', () => {
  test('should return false if minimal Caracteres is not respected ', () => {
    const sut = new MinimalCaracteres(6);
    const password = '1333';
    const res = sut.isValid(password);
    expect(res).toBe(false);
  });

  test('should return true if minimal Caracteres is respected ', () => {
    const sut = new MinimalCaracteres(6);
    const password = '1333333333';
    const res = sut.isValid(password);
    expect(res).toBe(true);
  });
});
