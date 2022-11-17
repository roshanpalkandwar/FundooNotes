import express from 'express';
import * as userController from '../controllers/user.controller';
import  {newUserValidator}  from '../validators/user.validator';
//import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to Registration  new user
router.post('/register', newUserValidator, userController.RegisterNewUser);

//route to get all users
router.get('', userController.getAllUsers);

//route to get a single user by their user id
router.get('/:_id',  userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);



export default router;
