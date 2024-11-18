import {Router} from 'express';
import {incrementViewCount, getCarStatistics} from '../controllers/advertisingView.controller';
import {authenticateUser} from '../middlewares/auth.middleware';

const advertisingViewRouter = Router();

advertisingViewRouter.get('/:id/view', authenticateUser, incrementViewCount);
advertisingViewRouter.get('/:id/statistics', authenticateUser, getCarStatistics);


export {advertisingViewRouter};
