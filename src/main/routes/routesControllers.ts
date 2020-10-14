import {Request, Response} from 'express';
import signUpControllerFactory from '../factories/controllers/signupFactory';
import logincontrollerfacotry from '../factories/controllers/LoginFactory';
import {sendEmailFactory} from '../factories/sendEmailFactory';
import {editAccountFactory} from '../../main/factories/controllers/editAccountFactory';
import {publishFactory} from '../factories/controllers/publishFactory';
import {listPubs} from '../factories/listpubsfactory';
class Routes {
  async publish(req: Request, res: Response) {
    const {title, companyName, tecnology, informações, contato, preço, localizaçao, typo, presencialOuRemoto} = req.body;
    console.log(title);
    const response = await publishFactory().pub({title, companyName, tecnology, informações, contato, preço, localizaçao, typo, presencialOuRemoto});
    const status = response?.status || 500;
    console.log('hahahah');
    return res.status(status).json(response?.body);
  }

  async signup(req: Request, res: Response) {
    const response = await signUpControllerFactory().signUp(req.body);
    return res.status(response.status).json(response);
  }
  async login(req: Request, res: Response) {
    console.log(req);
    const response = await logincontrollerfacotry().login(req.body);
    console.log(response);
    return res.status(response.status).json(response);
  }
  async sendEmail(req: Request, res: Response) {
    const {email} = req.body;
    const resp = await sendEmailFactory().send(email);

    return res.status(resp).json();
  }

  async editAccount(req: Request, res: Response) {
    const {token} = await req.body;
    const {password} = req.body;
    const data = {
      token: String(token) || 'a',
      modifie: password,
    };
    const response = await editAccountFactory().edit(data);
    return res.status(response.status).json(response);
  }

  async listpubs(req: Request, res: Response) {
    const response = await listPubs().list();
    return res.status(response.status).json(response);
  }
}


export default Routes;
