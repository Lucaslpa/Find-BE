import {Request, Response} from 'express';
import signUpControllerFactory from '../factories/controllers/signupFactory';
import logincontrollerfacotry from '../factories/controllers/LoginFactory';
import {sendEmailFactory} from '../factories/sendEmailFactory';
import {editAccountFactory} from '../../main/factories/controllers/editAccountFactory';
import {publishFactory} from '../factories/controllers/publishFactory';
import {listPubs} from '../factories/listpubsfactory';
import {searchFactory} from '../../main/factories/controllers/searchFactory';
class Routes {
  async search(req: Request, res: Response) {
    const {index, search, region} = req.headers;
    console.log('meu deus', index, search, region);
    const data = {index: Number(index) || 1, search: String(search) || '', region: String(region) || ''};
    const r = await searchFactory().search(data);
    const response:any = {
      status: r?.status || 500,
      body: r?.body || 'erro',
    };
    res.status(response?.status).json(response?.body);
  }

  async publish(req: Request, res: Response) {
    const {token, title, companyName, tecnology, informações, contato, preço, localizaçao, typo, presencialOuRemoto} = req.body;
    const response = await publishFactory().pub({token, title, companyName, tecnology, informações, contato, preço, localizaçao, typo, presencialOuRemoto});
    const status = response?.status || 500;
    return res.status(status).json(response?.body);
  }

  async signup(req: Request, res: Response) {
    const response = await signUpControllerFactory().signUp(req.body);
    return res.status(response.status).json(response);
  }
  async login(req: Request, res: Response) {
    const response = await logincontrollerfacotry().login(req.body);

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
    const {page} = req.query;
    const pages = Number(page) || 1;

    const response = await listPubs().list(pages);
    return res.status(response.status).json(response);
  }
}


export default Routes;
