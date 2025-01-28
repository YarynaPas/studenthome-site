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
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveReview = void 0;
const api_error_1 = require("../errors/api-error");
const rewiew_service_1 = require("../services/rewiew.service");
const leaveReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderId, rating, comment } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return next(new api_error_1.ApiError(401, 'Користувач не авторизований'));
    }
    if (!rating || rating < 1 || rating > 5) {
        return next(new api_error_1.ApiError(400, 'Оцінка має бути від 1 до 5'));
    }
    try {
        const review = yield rewiew_service_1.reviewService.leaveReview(orderId, userId, rating, comment);
        res.status(201).json(review);
    }
    catch (error) {
        next(error);
    }
});
exports.leaveReview = leaveReview;
