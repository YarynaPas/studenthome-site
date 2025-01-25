import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/order.service';
import { AuthenticatedRequest } from '../types/authenticated-request';
import {Discipline} from "../models/discipline.model";
import {Order} from "../models/order.model";
import fs from "fs";
import path from "path";
export const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders); // Відправка відповіді
    } catch (error) {
        next(error); // Передача помилки
    }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({
            where: { id: Number(id) },
            include: [
                {
                    model: Discipline,
                    attributes: ['discipline_name'] // Включаємо лише назву дисципліни
                }
            ]
        });

        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).send('Не знайдено користувача'); // Немає return
            return;
        }

        const order = await orderService.createOrder(req.body, userId);
        res.status(201).json(order); // Немає return
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        await orderService.deleteOrder(Number(id));
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(Number(id), status);
        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const getOrdersByStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { status } = req.query;

        if (!status) {
            res.status(400).json({ message: 'Статус є обов\'язковим' });
            return;
        }

        const orders = await orderService.getOrdersByStatus(status as string);
        res.status(200).json(orders);
    } catch (error) {
        next(error);
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
