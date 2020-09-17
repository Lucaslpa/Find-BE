/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';

const router = Router();

const routescontroller = new RoutesController;


router.post('/signup', routescontroller.signup );
router.get('/signup', routescontroller.getsignup );
router.get('/login', routescontroller.login);


export default router;
