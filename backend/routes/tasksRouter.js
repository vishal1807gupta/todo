import { Router } from 'express';
import {addtask, deletetask, gettasks, updatetasks, searchtasks, todotasks } from '../controllers/tasks.js';
import auth from '../middleware/auth.js';

const tasksRouter = Router();
tasksRouter.post('/addtask',auth, addtask);
tasksRouter.delete('/deletetask/:id',auth,deletetask);
tasksRouter.get('/gettasks',auth, gettasks);
tasksRouter.post('/searchtasks',auth,searchtasks);
tasksRouter.patch('/updatetasksText/:id',auth,updatetasks);
tasksRouter.patch('/updatetasksTodo/:id',auth,todotasks);

export default tasksRouter;
