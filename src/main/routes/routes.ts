/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';
import {Middlewares} from './middlewaresController';


const router = Router();
const middlewares = new Middlewares;

const routescontroller = new RoutesController;


router.post('/signup', routescontroller.signup );
router.post('/sendEmail', routescontroller.sendEmail );
router.post('/login', routescontroller.login);
router.put('./editAccount' , routescontroller.editAccount)


export default router;
