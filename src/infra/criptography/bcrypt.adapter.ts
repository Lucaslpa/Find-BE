import bcrypt from 'bcrypt';
export interface encrypt {
    encrypt(value: string): Promise<string>
    compare(value: string, hash: string): Promise<boolean>
}

export class Encrytp implements encrypt {
  async encrypt(value: string): Promise<string> {
    const HashedPassword = await bcrypt.hash(value, 12);
    return Promise.resolve(HashedPassword);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash);
    return Promise.resolve(isEqual);
  }
}


