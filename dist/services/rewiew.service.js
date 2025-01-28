"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = exports.ReviewService = void 0;
const order_model_1 = require("../models/order.model");
const api_error_1 = require("../errors/api-error");
const status_enum_1 = require("../enum/status-enum");
const rewiew_model_1 = __importDefault(require("../models/rewiew.model"));
class ReviewService {
    leaveReview(orderId, userId, rating, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.Order.findByPk(orderId);
            if (!order || order.status !== status_enum_1.StatusEnum.READY) {
                throw api_error_1.ApiError.badRequest('Замовлення не готове для відгуку');
            }
            if (order.user_id !== userId) {
                throw api_error_1.ApiError.forbidden('Ви не можете залишити відгук для цього замовлення');
            }
            const review = yield rewiew_model_1.default.create({
                user_id: userId,
                rating,
                comment,
                created_at: new Date().toString(),
                updated_at: new Date().toString()
            });
            return review;
        });
    }
}
exports.ReviewService = ReviewService;
exports.reviewService = new ReviewService();
