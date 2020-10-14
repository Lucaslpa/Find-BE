
import {error} from '../../presentation/controllers/CompositeValidators/interfaces';


export interface loadAccountTokenTypes {
    load(token: string ): Promise<error | null>
}
