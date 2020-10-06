import {SendEmail} from './sendemail';
class NodeMailerAdapterStub {
  send(email: string): Promise<any> {
    return new Promise( (resolve) => resolve('ok'));
  }
}


const makeSut = () => {
  const sender = new NodeMailerAdapterStub;

  return {
    sut: new SendEmail(sender),
    sender,
  };
};

describe('Name of the group', () => {
  test('should ensure adapter send is calle with correct value ', () => {
    const {sender, sut} = makeSut();
    const spy = jest.spyOn(sender, 'send' );
    const data = 'lauas@gmail.com';
    sut.send(data);
    expect(spy).toBeCalledWith(data);
  });
});
