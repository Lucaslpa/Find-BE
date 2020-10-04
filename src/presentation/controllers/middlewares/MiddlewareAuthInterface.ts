export interface accountmodel {
    id: number,
    name: string,
    email: string
}

export interface reqMiddleware {
    headers: any
}

export interface loadaccounttokenTypes {
    load(token: string ): Promise<accountmodel | null>
}
