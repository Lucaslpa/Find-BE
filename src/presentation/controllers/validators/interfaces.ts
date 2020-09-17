export interface error {

        status: number,
        error: string

}

export interface success {

          status: number,
          data: any

}

export interface Validation {
    validate(data: any): undefined | error

}
