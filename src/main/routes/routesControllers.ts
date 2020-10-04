import {Request, Response} from 'express';
import signUpControllerFactory from '../factories/signupFactory';
import logincontrollerfacotry from '../factories/LoginFactory';

class Routes {
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
  getsignup(req: Request, res: Response) {
    return res.status(200).json('response');
  }
}


export default Routes;
