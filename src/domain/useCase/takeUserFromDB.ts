import {DataAccountTypesRes} from '../../data/interfaces';
import {erro} from '../../domain/protocols/errors/ProcessError';
export interface takeUser {
    get(email: string ): Promise<DataAccountTypesRes | erro>
}
