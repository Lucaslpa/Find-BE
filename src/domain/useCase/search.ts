
export interface dataSearch {

    search: string
    region: string
}


export interface search {
    search(index: number, search: string): Promise<object[] | null>
}

export interface searchRegion {
    searchRegion(index: number, region: string): Promise<object[] | null>
}

