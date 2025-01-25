import { Request, Response, NextFunction } from "express";
import { Order } from "../models/order.model";
import { StatusEnum } from "../enum/status-enum";
import fs from "fs";
import path from "path";
import { PaymentStatusEnum } from "../enum/payment-status-enum";
import { ApiError } from "../errors/api-error";

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status, topic } = req.query;
        let validStatus: StatusEnum | undefined;
        let validTopic: string | undefined;

        // Перевірка статусу
        if (status && typeof status === "string" && Object.values(StatusEnum).includes(status as StatusEnum)) {
            validStatus = status as StatusEnum;
        }

        // Перевірка топіка
        if (topic && typeof topic === "string") {
            validTopic = topic;
        }

        // Пошук замовлень за статусом і топіком
        const orders = await Order.findAll({
            where: {
                ...(validStatus && { status: validStatus }),  // якщо є статус, додаємо його
                ...(validTopic && { topic: validTopic }),    // якщо є топік, додаємо його
            },
        });

        res.status(200).json(orders);
    } catch (error: any) {
        next(ApiError.internal(`Error fetching orders: ${error.message}`));
    }
};


export const updatePrice = async (id: string, cost: number): Promise<void> => {
    try {
        const order = await Order.findByPk(id);

        if (!order) {
            throw ApiError.notFound("Order not found");
        }

        order.cost = cost;
        await order.save();
    } catch (error: any) {
        throw ApiError.internal(`Error updating price for order ${id}: ${error.message}`);
    }
};

export const attachFileToOrder = async (id: string, file: Express.Multer.File): Promise<void> => {
    try {
        const order = await Order.findByPk(id);

        if (!order) {
            throw new Error("Order not found");
        }

        const uploadDir = path.join(__dirname, "../../uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Генерація безпечного імені файлу
        const timestamp = Date.now();
        const originalFileName = file.originalname.normalize("NFC"); // Нормалізація для коректної роботи з українськими символами
        const safeFileName = `${timestamp}-${originalFileName}`;
        const filePath = path.join(uploadDir, safeFileName);

        await fs.promises.rename(file.path, filePath);

        order.file_path = safeFileName;
        await order.save();
    } catch (error: any) {
        throw new Error(`Error attaching file to order: ${error.message}`);
    }
};

export const updatePaymentStatus = async (id: string, paymentStatus: PaymentStatusEnum): Promise<void> => {
    try {
        const order = await Order.findByPk(id);

        if (!order) {
            throw ApiError.notFound("Order not found");
        }

        if (!Object.values(PaymentStatusEnum).includes(paymentStatus)) {
            throw ApiError.badRequest("Invalid payment status");
        }

        order.payment_status = paymentStatus;
        await order.save();
    } catch (error: any) {
        throw ApiError.internal(`Error updating payment status for order ${id}: ${error.message}`);
    }
};

export const updateStatus = async (id: string, status: StatusEnum): Promise<void> => {
    try {
        const order = await Order.findByPk(id);

        if (!order) {
            throw ApiError.notFound("Order not found");
        }

        if (!Object.values(StatusEnum).includes(status)) {
            throw ApiError.badRequest("Invalid status");
        }

        order.status = status;
        await order.save();
    } catch (error: any) {
        throw ApiError.internal(`Error updating status for order ${id}: ${error.message}`);
    }
};


export const downloadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);

        if (!order || !order.file_path) {
            res.status(404).json({ message: "File not found" });
            return;
        }

        const uploadDir = path.join(__dirname, "../../uploads");
        const filePath = path.join(uploadDir, order.file_path);

        if (!fs.existsSync(filePath)) {
            res.status(404).json({ message: "File not found on server" });
            return;
        }

        res.setHeader(
            "Content-Disposition",
            `attachment; filename*=UTF-8''${encodeURIComponent(order.file_path)}`
        );

        res.download(filePath, order.file_path, (err) => {
            if (err) {
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
