import express from 'express';
import * as userController from '../controllers/user.controller';
import  {newUserValidator}  from '../validators/user.validator';
//import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to Registration  new user
router.post('/register', newUserValidator, userController.RegisterNewUser);



export default router;
