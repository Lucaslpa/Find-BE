export interface error {

        status: number,
        error: string

}

export interface Validation {
    validate(data: any): undefined | error

}
