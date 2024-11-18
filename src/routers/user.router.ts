import {Router} from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller';
import {validateUserData} from '../middlewares/validateUserData';
import {errorHandler} from '../middlewares/error.middleware';
import {authenticateUser} from "../middlewares/auth.middleware";
import {authorizeRole} from "../middlewares/authorize.middleware";
import {RoleTypeEnum} from "../enum/role-type-enum";
import {managerRouter} from "./manager.router";

managerRouter.use(authenticateUser);
managerRouter.use(authorizeRole(RoleTypeEnum.Manager || RoleTypeEnum.Admin));
const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', validateUserData, updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.use(errorHandler);

export {userRouter};

