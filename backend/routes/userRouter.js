import { Router } from 'express';
import { register,login,getUsers } from '../controllers/user.js';

const userRouter = Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/getUsers',getUsers);

export default userRouter;
