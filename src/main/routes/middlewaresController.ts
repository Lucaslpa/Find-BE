import {middlewreTokenFacory} from '../factories/AuthMiddlewareFactory';
import {Request, Response, NextFunction} from 'express';


export class Middlewares {
  async authMiddleware(req: Request, res: Response, next : NextFunction) {
    if (!req.headers.authorization) {
      return res.status(401).json('Unauthorized');
    }
    const token = req.headers.authorization?.split(' ');

    if (token) {
      const authorizade = await middlewreTokenFacory().load(token[1]);
      if (authorizade) {
        return res.status(authorizade.status).json(authorizade.error);
      }
    }

    return next();
  }
}
