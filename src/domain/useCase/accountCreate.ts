import {DataAccountTypesRes, DataAccountTypes} from '../../data/interfaces';
export interface AddAccount {
 add(DataAccount: DataAccountTypes ): Promise<DataAccountTypesRes>
}

