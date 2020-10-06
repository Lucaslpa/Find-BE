import {SendEmail} from './sendemail';

class NodemailerAdapterStub {
  transporter() {
    return 'ok';
  }
}


const makeSut = () => {
  const sender = new NodemailerAdapterStub;
  return {
    sut: new SendEmail,
    sender,
  };
};

describe('Name of the group', () => {
  test('should ', () => {
    const {sender, sut} = makeSut();
    const spy = jest.spyOn(sender, 'transporter' );
    const data = '';
    sut.send(data);
    expect(spy).toBeCalledWith(data);
  });
});
