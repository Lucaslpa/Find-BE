import {Request, Response} from 'express';
import signUpControllerFactory from '../factories/controllers/signupFactory';
import logincontrollerfacotry from '../factories/controllers/LoginFactory';
import {sendEmailFactory} from '../factories/sendEmailFactory';
import {editAccountFactory} from '../../main/factories/controllers/editAccountFactory';
class Routes {
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
    const {token} = await req.query!;
    const {password} = req.body;
    const data = {
      token: String(token) || 'a',
      modifie: password,
    };


    const response = await editAccountFactory().edit(data);
    return res.status(response.status).json(response);
  }
}


export default Routes;
