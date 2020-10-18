import {generatecontent, takeUser} from '../../../domain/useCase';
import {contentData} from '../../../domain/utils/transporterEmailAdapter';
import {loadTokenType} from '../../../infra/token/jwtokeninterfaces';
export class GenerateContent implements generatecontent {
  constructor(
         private readonly getAccountFromDB : takeUser,
         private readonly loadToken : loadTokenType,
  ) {}
  async generate(email: string ): Promise<contentData | number> {
    const account = await this.getAccountFromDB.get(email);
    if (!account) {
      return 400;
    }
    const tokenDataToGenerateToken = {
      id: String(account.id),
      name: account.name,
      email: account.email,
    };
    const token = await this.loadToken.loadToken(tokenDataToGenerateToken);
    const link = `http://localhost:3000/editPassword?token=${token}`;
    const data = {
      from: 'Encontre group',
      to: `${email}`,
      subject: 'Link para teste',
      text: 'Hello lucas. We are testing!!',
      html: `<strong> Redefinir Senha </strong> <h3> ${link} <h3> `,
    };
    return data;
  }
}
