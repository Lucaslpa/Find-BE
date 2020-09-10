import {Request, Response} from 'express';


class Routes {
  acessado(req : Request, res: Response) {
    res.json('acessada');
  }
}


export default Routes;
