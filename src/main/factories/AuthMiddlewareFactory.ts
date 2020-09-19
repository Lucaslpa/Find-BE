import MiddlewreToken from '../../data/useCase/loadAccountToken/loadAccountToken';
import Decode from '../../infra/token/jwtokenDecodeTokenAdapter';
import s from '../../../.s';


export const middlewreTokenFacory = () => {
  const decode = new Decode(s);

  return new MiddlewreToken(decode);
};
