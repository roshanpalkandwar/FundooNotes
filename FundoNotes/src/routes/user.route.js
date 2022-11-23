import express from 'express';
import * as userController from '../controllers/user.controller';
import  {newUserValidator}  from '../validators/user.validator';
import { userAuthentication} from '../middlewares/auth.middleware';


const router = express.Router();

//route to Registration  new user
router.post('/register', newUserValidator, userController.RegisterNewUser);

//route to login user
router.post('/login',  userController.loginUser);

//route to forgot password
router.post('/forgotPassaword',userController.ForgottPassword);

//route to reset the password
router.post('/resetPassaword',userAuthentication,userController.resetPassword);

export default router;
