/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';
import {Middlewares} from './middlewaresController';


const middlewares = new Middlewares;
const router = Router();

const routescontroller = new RoutesController;


router.post('/signup', routescontroller.signup );
router.post('/sendEmail', routescontroller.sendEmail );
router.post('/login', routescontroller.login);
router.post('/publish', middlewares.authMiddleware, routescontroller.publish);
router.put('/editPassword', routescontroller.editAccount);
router.get('/allpubs', middlewares.authMiddleware, routescontroller.listpubs);
router.get('/search', middlewares.authMiddleware, routescontroller.search);


export default router;
