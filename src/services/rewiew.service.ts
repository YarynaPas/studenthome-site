
import { Order } from '../models/order.model';
import { ApiError } from '../errors/api-error';
import { StatusEnum } from '../enum/status-enum';
import Review from "../models/rewiew.model";
export class ReviewService {
    async leaveReview(orderId: number, userId: number, rating: number, comment: string) {
        const order = await Order.findByPk(orderId);
        if (!order || order.status !== StatusEnum.READY) {
            throw ApiError.badRequest('Замовлення не готове для відгуку');
        }
        if (order.user_id !== userId) {
            throw ApiError.forbidden('Ви не можете залишити відгук для цього замовлення');
        }
        const review = await Review.create({
            user_id: userId,
            rating,
            comment,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });

        return review;
    }
}
export const reviewService = new ReviewService();
