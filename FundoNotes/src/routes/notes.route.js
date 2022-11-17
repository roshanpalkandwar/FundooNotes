import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import  {newNotesValidator}  from '../validators/user.validator';

const router = express.Router();

//router to create a note
router.post('', userAuth,newNotesValidator,  notesController.createNote);

//router to get all notes
router.get('', userAuth, notesController.getAllNotes);


export default router;