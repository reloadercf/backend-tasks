import express from 'express';
import { usersControllerGet, userControllerPost } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', usersControllerGet);
userRouter.post('/', userControllerPost);

export default userRouter;
