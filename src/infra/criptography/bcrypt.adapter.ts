import bcrypt from 'bcrypt';
export interface encrypt {
    encrypt(value: string): Promise<string>
}

class Encrytp implements encrypt {
  async encrypt(value: string): Promise<string> {
    const HashedPassword = await bcrypt.hash(value, 12);
    console.log(HashedPassword);
    const hashedPassword = 'Hash Password';
    return Promise.resolve(hashedPassword);
  }
}


export default Encrytp;
