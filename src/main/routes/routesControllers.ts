import {Request, Response} from 'express';
import signUpControllerFactory from '../factories/signupFactory';
import logincontrollerfacotry from '../factories/LoginFactory';
import {sendEmailFactory} from '../factories/sendEmailFactory';
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
    console.log(req.body);
    const {email} = req.body;
    const resp = await sendEmailFactory().send(email);
    return res.status(resp).json();
  }
}


export default Routes;
