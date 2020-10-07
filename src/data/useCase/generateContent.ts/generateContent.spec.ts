import {GenerateContent} from './generateContent';
import {DataAccountTypesRes} from '../../interfaces';
import {LoadToken} from '../../../infra/token/jwtokenLoadTokenAdapter';
class GetaccountStub {
  get(email: string ): Promise<DataAccountTypesRes> {
    return new Promise((resolve) => resolve({
      id: 0,
      name: '',
      email: '',
      password: '',
    }));
  }
}


const makeSuts = () => {
  const getaccount = new GetaccountStub;
  const loadtoken = new LoadToken('3232323232323');

  return {
    sut: new GenerateContent(getaccount, loadtoken),
    getaccount,
  };
};


describe('Generate Content', () => {
  test('ensure take account is called with correct value', () => {
    const {sut, getaccount} = makeSuts();
    const spy = jest.spyOn( getaccount, 'get');
    const email = 'matheus@hotmail.com';
    sut.generate(email);
    const data = {
      from: 'Encontre group',
      to: 'l1.lucas333@hotmail.com',
      subject: 'New testes',
      text: 'Hello lucas. We are testing!!',
      html: ' <strong> Redefinir Senha </strong> <h1> localhost:200/424124?token <h1> ',
    };
    expect(spy).toBeCalledWith(email);
  });
});
