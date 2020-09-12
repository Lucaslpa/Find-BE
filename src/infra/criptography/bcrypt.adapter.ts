import bcrypt from 'bcrypt';
export interface encrypt {
    encrypt(value: string): Promise<string>
}

export default class Encrytp implements encrypt {
  async encrypt(value: string): Promise<string> {
    const HashedPassword = await bcrypt.hash(value, 12);
    return Promise.resolve(HashedPassword);
  }
}


