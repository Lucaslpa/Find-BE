/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';

const router = Router();

const routescontroller = new RoutesController;


router.post('/signup', routescontroller.signup );
router.get('/signup', routescontroller.getsignup );


export default router;
