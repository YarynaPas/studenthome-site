
import { Router } from 'express';
import {authenticateUser} from "../middlewares/auth.middleware";
import {leaveReview} from "../controllers/rewiew.controller";
const reviewRouter = Router();

reviewRouter.post('/', authenticateUser, leaveReview);

export { reviewRouter };
