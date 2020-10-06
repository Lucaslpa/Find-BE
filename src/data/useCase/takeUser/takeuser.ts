import {takeUser} from '../../../domain/useCase/takeUserFromDB';
import {DataAccountTypesRes} from '../../../data/interfaces';
import {DBrepositoryQuerys} from '../../interfaces';
import {Error, erro} from '../../../domain/protocols/errors/ProcessError';
export class TakeUserFromDB implements takeUser {
  constructor(
        private getUserUserRepository : DBrepositoryQuerys,
  ) {}
  async get(email: string ): Promise<DataAccountTypesRes | erro> {
    const res = await this.getUserUserRepository.getOfDb(email);
    if (!res) {
      return new Promise((resolve) => resolve(new Error(500).return(' Something wrong') ));
    }
    return res;
  }
}
