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
exports.downloadFile = exports.attachFileToOrder = exports.getOrdersByStatus = exports.updateOrderStatus = exports.deleteOrder = exports.createOrder = exports.getOrderById = exports.getOrders = void 0;
const order_service_1 = require("../services/order.service");
const discipline_model_1 = require("../models/discipline.model");
const order_model_1 = require("../models/order.model");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.orderService.getAllOrders();
        res.json(orders); // Відправка відповіді
    }
    catch (error) {
        next(error); // Передача помилки
    }
});
exports.getOrders = getOrders;
const getOrderById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_model_1.Order.findOne({
            where: { id: Number(id) },
            include: [
                {
                    model: discipline_model_1.Discipline,
                    attributes: ['discipline_name'] // Включаємо лише назву дисципліни
                }
            ]
        });
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderById = getOrderById;
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).send('Не знайдено користувача'); // Немає return
            return;
        }
        const order = yield order_service_1.orderService.createOrder(req.body, userId);
        res.status(201).json(order); // Немає return
    }
    catch (error) {
        next(error);
    }
});
exports.createOrder = createOrder;
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield order_service_1.orderService.deleteOrder(Number(id));
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrder = deleteOrder;
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = yield order_service_1.orderService.updateOrderStatus(Number(id), status);
        res.json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getOrdersByStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        if (!status) {
            res.status(400).json({ message: 'Статус є обов\'язковим' });
            return;
        }
        const orders = yield order_service_1.orderService.getOrdersByStatus(status);
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrdersByStatus = getOrdersByStatus;
const attachFileToOrder = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Order.findByPk(id);
        if (!order) {
            throw new Error("Order not found");
        }
        const uploadDir = path_1.default.join(__dirname, "../../uploads");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Генерація безпечного імені файлу
        const timestamp = Date.now();
        const originalFileName = file.originalname.normalize("NFC"); // Нормалізація для коректної роботи з українськими символами
        const safeFileName = `${timestamp}-${originalFileName}`;
        const filePath = path_1.default.join(uploadDir, safeFileName);
        yield fs_1.default.promises.rename(file.path, filePath);
        order.file_path = safeFileName;
        yield order.save();
    }
    catch (error) {
        throw new Error(`Error attaching file to order: ${error.message}`);
    }
});
exports.attachFileToOrder = attachFileToOrder;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield order_model_1.Order.findByPk(id);
        if (!order || !order.file_path) {
            res.status(404).json({ message: "File not found" });
            return;
        }
        const uploadDir = path_1.default.join(__dirname, "../../uploads");
        const filePath = path_1.default.join(uploadDir, order.file_path);
        if (!fs_1.default.existsSync(filePath)) {
            res.status(404).json({ message: "File not found on server" });
            return;
        }
        res.setHeader("Content-Disposition", `attachment; filename*=UTF-8''${encodeURIComponent(order.file_path)}`);
        res.download(filePath, order.file_path, (err) => {
            if (err) {
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.downloadFile = downloadFile;
