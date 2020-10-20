import {search, searchRegion} from '../../../domain/useCase/search';
export interface dataSearch {
     index: number,
     search: string;
     region: string
}


export class SearchController {
  constructor(
         private readonly searchDB: search,
         private readonly searchRegionDB: searchRegion,
  ) {}
  async search(data: dataSearch ) {
    let result: any[] = [];
    if (data.search) {
      const search = await this.searchDB.search(data.index, data.search);
      if (!search) {
        return;
      }
      console.log(search);
      result.push(...search);
    }

    if (data.region) {
      const regions:any = await this.searchRegionDB.searchRegion(data.index, data.region);

      if (!regions) {
        return;
      }
      if (result.length > 0) {
        const ids = result.map((i) => i.id);
        regions.forEach((i:any) => {
          if (ids.indexOf(i.id) === -1) {
            result.push(i);
          }
        });
      }

      if (result.length === 0 && regions) {
        result.push(...regions);
      }
    }
    return {
      status: 200,
      body: result,
    };
  }
}
