/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';
import {Middlewares} from './middlewaresController';


const router = Router();
const middlewares = new Middlewares;

const routescontroller = new RoutesController;


router.post('/signup', routescontroller.signup );
router.get('/test', middlewares.authMiddleware, routescontroller.getsignup );
router.post('/login', routescontroller.login);


export default router;
