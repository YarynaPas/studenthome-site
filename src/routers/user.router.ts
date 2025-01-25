import {Router} from 'express';

import {validateUserData} from '../middlewares/validateUserData';
import {errorHandler} from '../middlewares/error.middleware';
import {authenticateUser} from "../middlewares/auth.middleware";
import {deleteUser, getUserById, getUsers, updateUser, getUserData} from "../controllers/user.controller";
const userRouter = Router();
userRouter.put('/user', authenticateUser, updateUser);
userRouter.get('/user', authenticateUser, getUserData);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', validateUserData, updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.use(errorHandler);

export {userRouter};

