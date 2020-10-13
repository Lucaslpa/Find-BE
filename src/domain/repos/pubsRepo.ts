import {data} from '../useCase/publish.interfaace';
export interface pubsrepo {
    addToDB(data: data): Promise<any>
}
