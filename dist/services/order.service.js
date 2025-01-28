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
exports.orderService = exports.OrderService = void 0;
const order_model_1 = require("../models/order.model");
const discipline_model_1 = require("../models/discipline.model");
const subject_model_1 = require("../models/subject.model");
const api_error_1 = require("../errors/api-error");
const orders_type_enum_1 = require("../enum/orders-type-enum");
const status_enum_1 = require("../enum/status-enum");
const payment_status_enum_1 = require("../enum/payment-status-enum");
class OrderService {
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_model_1.Order.findAll();
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.Order.findByPk(id);
            if (!order) {
                throw api_error_1.ApiError.badRequest('Замовлення не знайдене');
            }
            return order;
        });
    }
    createOrder(orderData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, discipline_name, subject_name, number_of_pages, deadline, comment, topic, social_media } = orderData;
            // Перевірка на наявність усіх обов'язкових полів
            if (!type || !discipline_name || !subject_name || !number_of_pages || !deadline || !topic) {
                throw api_error_1.ApiError.badRequest('Усі обов’язкові поля мають бути заповнені');
            }
            // Пошук дисципліни в базі
            const discipline = yield discipline_model_1.Discipline.findOne({ where: { discipline_name } });
            if (!discipline) {
                throw api_error_1.ApiError.badRequest('Дисципліна не знайдена');
            }
            // Пошук предмету в базі
            const subject = yield subject_model_1.Subject.findOne({ where: { subject_name } });
            if (!subject) {
                throw api_error_1.ApiError.badRequest('Предмет не знайдений');
            }
            // Пошук типу замовлення в enum
            const orderType = Object.values(orders_type_enum_1.OrdersTypesEnum).find((enumValue) => enumValue === type.trim());
            if (!orderType) {
                throw api_error_1.ApiError.badRequest('Невідомий тип замовлення');
            }
            // Створення нового замовлення
            const newOrder = yield order_model_1.Order.create({
                user_id: userId,
                type: orderType,
                discipline_id: discipline.id,
                subject_id: subject.id,
                number_of_pages,
                deadline,
                comment,
                application_date: new Date(),
                status: status_enum_1.StatusEnum.IN_PROGRESS, // Статус за замовчуванням
                payment_status: payment_status_enum_1.PaymentStatusEnum.NOT_PAID, // Статус оплати за замовчуванням
                discipline_name,
                subject_name,
                cost: 0, // Вартість за замовчуванням
                submission_date: null,
                author_name: '', // Можна додати, якщо є
                topic,
                file_path: null,
                social_media
            });
            return newOrder;
        });
    }
    getOrdersByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object.values(status_enum_1.StatusEnum).includes(status)) {
                throw new Error('Невірний статус замовлення');
            }
            const orders = yield order_model_1.Order.findAll({
                where: { status },
            });
            return orders;
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.Order.findByPk(id);
            if (!order) {
                throw api_error_1.ApiError.badRequest('Замовлення не знайдене');
            }
            yield order.destroy();
            return true;
        });
    }
    updateOrderStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.Order.findByPk(id);
            if (!order) {
                throw api_error_1.ApiError.badRequest('Замовлення не знайдене');
            }
            order.status = status;
            yield order.save();
            return order;
        });
    }
}
exports.OrderService = OrderService;
exports.orderService = new OrderService();
