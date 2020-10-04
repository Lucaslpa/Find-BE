import LoadAccountToken from './loadAccountToken';
import {DecodeType} from '../../interfaces';
class DecodeJWTStub implements DecodeType {
  decodeToken(token: string): Promise<any> {
    return new Promise((resolve) => resolve({
      decodedToken: {
        id: 10,
      },
    }),
    );
  }
}


const makeSUT = () => {
  const decodejwtstub = new DecodeJWTStub;
  return {
    loadaccount: new LoadAccountToken(decodejwtstub),
    decodejwtstub,
  };
};


describe('Load account token', () => {
  test('ensure decode token is called with  correct value', async () => {
    const {decodejwtstub, loadaccount} = makeSUT();
    const spydecode = jest.spyOn(decodejwtstub, 'decodeToken');

    await loadaccount.load('24324324234234234234');

    expect(spydecode).toBeCalledWith('24324324234234234234');
  });
});
