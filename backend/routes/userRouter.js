import { Router } from 'express';
import { register,login,getUsers } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter = Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/getUser',auth,getUsers);

export default userRouter;
