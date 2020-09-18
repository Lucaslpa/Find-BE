import {tokenrequest} from '../../../domain/protocols/tokenrequest';
import ERROR from '../../../domain/protocols/errors/ProcessError';
import {AuthMiddleware} from '../middlewares/auth.middleware';

const sut = () => {
  return {
    authmiddleware: new AuthMiddleware,

  };
};


describe('Auth middleware', () => {
  test('should return 401/error if not find token ', () => {
    const {authmiddleware} = sut();
    const header: tokenrequest = {
      headers: {
        'x-acces-token': 'invalid_token',
      },
    };

    const response = authmiddleware.handle(header);
    expect(response).toEqual(new ERROR(401).return(' Unauthorized'));
  });
});
