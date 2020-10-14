import {takeUser} from '../../../domain/useCase/takeUserFromDB';
import {DataAccountTypesRes} from '../../../data/interfaces';
import {DBrepositoryQuerys} from '../../interfaces';
export class TakeUserFromDB implements takeUser {
  constructor(
        private getUserUserRepository : DBrepositoryQuerys,
  ) {}
  async get(email: string ): Promise<DataAccountTypesRes> {
    try {
      const res = await this.getUserUserRepository.getOfDb(email);
      return new Promise( (resolve) => resolve(res));
    } catch {
      return {
        id: 0,
        name: '',
        email: '',
        password: '',
      };
    }
  }
}
