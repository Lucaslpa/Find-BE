/* eslint-disable new-cap */
import {Router} from 'express';
import RoutesController from './routesControllers';


const router = Router();

const routescontroller = new RoutesController;


router.post('/signup', routescontroller.signup );
router.post('/sendEmail', routescontroller.sendEmail );
router.post('/login', routescontroller.login);
router.put('/editPassword', routescontroller.editAccount);


export default router;
