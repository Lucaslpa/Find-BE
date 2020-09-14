import {Request, Response} from 'express';
import signUpControllerFactory from '../factories/signupFactory';


class Routes {
  async signup(req: Request, res: Response) {
    const response = await signUpControllerFactory().signUp(req.body);
    return res.status(200).json(response);
  }

  getsignup(req: Request, res: Response) {
    return res.status(200).json('response');
  }
}


export default Routes;
