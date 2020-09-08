export interface AddAccountInsert {
    name?: string,
    email?: string,
    password?: string,
    passwordConfirm?: string
  }
export interface AddAccountInserted {
    status: number
    account: any
  }

export interface AddAccountType {
    addAccount(DataAccount: AddAccountInsert): Promise<AddAccountInserted>
  }

