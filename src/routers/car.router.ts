import {Router} from 'express';
import {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    editCarListing,
    createCarListing,
} from '../controllers/car.controller';
import {errorHandler} from '../middlewares/error.middleware';
import {authenticateUser} from '../middlewares/auth.middleware';
import {authorizeRole} from '../middlewares/authorize.middleware';
import {RoleTypeEnum} from '../enum/role-type-enum';

const carRouter = Router();

carRouter.get('/', getCars);
carRouter.get('/:id', getCarById);
carRouter.post('/', authenticateUser, authorizeRole(RoleTypeEnum.Seller), createCar);
carRouter.put('/:id', authenticateUser, authorizeRole(RoleTypeEnum.Seller), updateCar);
carRouter.delete('/:id', authenticateUser, authorizeRole(RoleTypeEnum.Seller), deleteCar);
carRouter.post('/create', authenticateUser, createCarListing);
carRouter.put('/edit', authenticateUser, editCarListing);

carRouter.use(errorHandler);

export {carRouter};
