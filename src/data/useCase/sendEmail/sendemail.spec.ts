import {SendEmail} from './sendemail';
import {contentData} from '../../../domain/utils/transporterEmailAdapter';
class NodeMailerAdapterStub {
  send(content: contentData ): Promise<any> {
    return new Promise( (resolve) => resolve('ok'));
  }
}

class GenerateContenteStub {
  generate(email: string ): Promise<any> {
    return Promise.resolve('');
  }
}

const makeSut = () => {
  const sender = new NodeMailerAdapterStub;
  const generateContent = new GenerateContenteStub;

  return {
    sut: new SendEmail(sender, generateContent),
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
