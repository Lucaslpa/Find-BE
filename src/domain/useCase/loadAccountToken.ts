
import {error} from '../../presentation/controllers/validators/interfaces';


export interface loadAccountTokenTypes {
    load(token: string ): Promise<error | null>
}
