import {DataAccountTypesRes} from '../../data/interfaces';
export interface takeUser {
    get(email: string ): Promise<DataAccountTypesRes>
}
