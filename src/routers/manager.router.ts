import {Router} from 'express';
import {banUser, deleteInvalidAd} from '../controllers/manager.controller';
import {authenticateUser} from '../middlewares/auth.middleware';
import {authorizeRole} from '../middlewares/authorize.middleware';
import {RoleTypeEnum} from '../enum/role-type-enum';

const managerRouter = Router();

managerRouter.use(authenticateUser);
managerRouter.use(authorizeRole(RoleTypeEnum.Manager || RoleTypeEnum.Admin));

managerRouter.post('/ban/:userId', banUser);
managerRouter.delete('/delete-ad/:carId', deleteInvalidAd);

export {managerRouter};
