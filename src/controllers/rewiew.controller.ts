import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';
import { reviewService } from "../services/rewiew.service";
import { AuthenticatedRequest } from "../types/authenticated-request";

export const leaveReview = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const { orderId, rating, comment } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return next(new ApiError(401, 'Користувач не авторизований'));
    }

    if (!rating || rating < 1 || rating > 5) {
        return next(new ApiError(400, 'Оцінка має бути від 1 до 5'));
    }

    try {
        const review = await reviewService.leaveReview(orderId, userId, rating, comment);
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};
