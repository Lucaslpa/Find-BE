/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';
import connection from '../../infra/db/ConnectionHelper';
const router = Router();

const routescontroller = new RoutesController;

connection.create().then(() => {
  router.get('/signup', routescontroller.signup );
},

);


export default router;
