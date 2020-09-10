/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';

const router = Router();

const routescontroller = new RoutesController;

router.get('/', routescontroller.acessado );


export default router;
