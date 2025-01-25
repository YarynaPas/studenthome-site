import { Order } from '../models/order.model';
import { Discipline } from '../models/discipline.model';
import { Subject } from '../models/subject.model';
import { ApiError } from '../errors/api-error';
import { OrdersTypesEnum } from '../enum/orders-type-enum';
import { StatusEnum } from '../enum/status-enum';
import { PaymentStatusEnum } from '../enum/payment-status-enum';

export class OrderService {
    async getAllOrders() {
        return await Order.findAll();
    }

    async getOrderById(id: number) {
        const order = await Order.findByPk(id);
        if (!order) {
            throw ApiError.badRequest('Замовлення не знайдене');
        }
        return order;
    }

    async createOrder(orderData: any, userId: number) {
        const { type, discipline_name, subject_name, number_of_pages, deadline, comment, topic, social_media } = orderData;

        // Перевірка на наявність усіх обов'язкових полів
        if (!type || !discipline_name || !subject_name || !number_of_pages || !deadline || !topic) {
            throw ApiError.badRequest('Усі обов’язкові поля мають бути заповнені');
        }

        // Пошук дисципліни в базі
        const discipline = await Discipline.findOne({ where: { discipline_name } });
        if (!discipline) {
            throw ApiError.badRequest('Дисципліна не знайдена');
        }

        // Пошук предмету в базі
        const subject = await Subject.findOne({ where: { subject_name } });
        if (!subject) {
            throw ApiError.badRequest('Предмет не знайдений');
        }

        // Пошук типу замовлення в enum
        const orderType = Object.values(OrdersTypesEnum).find((enumValue) =>
            enumValue === type.trim()
        );
        if (!orderType) {
            throw ApiError.badRequest('Невідомий тип замовлення');
        }

        // Створення нового замовлення
        const newOrder = await Order.create({
            user_id: userId,
            type: orderType,
            discipline_id: discipline.id,
            subject_id: subject.id,
            number_of_pages,
            deadline,
            comment,
            application_date: new Date(),
            status: StatusEnum.IN_PROGRESS, // Статус за замовчуванням
            payment_status: PaymentStatusEnum.NOT_PAID, // Статус оплати за замовчуванням
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
    }
    async getOrdersByStatus(status: string): Promise<Order[]> {
        if (!Object.values(StatusEnum).includes(status as StatusEnum)) {
            throw new Error('Невірний статус замовлення');
        }
        const orders = await Order.findAll({
            where: { status },
        });

        return orders;
    }


    async deleteOrder(id: number) {
        const order = await Order.findByPk(id);
        if (!order) {
            throw ApiError.badRequest('Замовлення не знайдене');
        }
        await order.destroy();
        return true;
    }

    async updateOrderStatus(id: number, status: StatusEnum) {
        const order = await Order.findByPk(id);
        if (!order) {
            throw ApiError.badRequest('Замовлення не знайдене');
        }
        order.status = status;
        await order.save();
        return order;
    }
}

export const orderService = new OrderService();
