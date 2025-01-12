import { Router } from 'express';
import {addNote, deleteNote, getNotes, updateNotes, searchNotes, todoNotes } from '../controllers/notes.js';
import auth from '../middleware/auth.js';

const notesRouter = Router();
notesRouter.post('/addNote',auth, addNote);
notesRouter.delete('/deleteNote/:id',auth,deleteNote);
notesRouter.get('/getNotes',auth, getNotes);
notesRouter.post('/searchNotes',auth,searchNotes);
notesRouter.patch('/updateNotesText/:id',auth,updateNotes);
notesRouter.patch('/updateNotesTodo/:id',auth,todoNotes);

export default notesRouter;
