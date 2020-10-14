import {loadAccountTokenTypes} from '../../../domain/useCase/loadAccountToken';
import {DecodeType} from '../../interfaces';
import {error} from '../../../presentation/controllers/CompositeValidators/interfaces';


export default class LoadAccountToken implements loadAccountTokenTypes {
  constructor(
         private readonly decode: DecodeType,
  ) {}

  async load(token: string ): Promise<error | null> {
    const dataDecoded = await this.decode.decodeToken(token);
    if (dataDecoded.status) {
      return dataDecoded;
    }
    return null;
  }
}
