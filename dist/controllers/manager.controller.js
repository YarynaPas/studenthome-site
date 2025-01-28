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
exports.downloadFile = exports.updateStatus = exports.updatePaymentStatus = exports.attachFileToOrder = exports.updatePrice = exports.getOrders = void 0;
const order_model_1 = require("../models/order.model");
const status_enum_1 = require("../enum/status-enum");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const payment_status_enum_1 = require("../enum/payment-status-enum");
const api_error_1 = require("../errors/api-error");
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, topic } = req.query;
        let validStatus;
        let validTopic;
        // Перевірка статусу
        if (status && typeof status === "string" && Object.values(status_enum_1.StatusEnum).includes(status)) {
            validStatus = status;
        }
        // Перевірка топіка
        if (topic && typeof topic === "string") {
            validTopic = topic;
        }
        // Пошук замовлень за статусом і топіком
        const orders = yield order_model_1.Order.findAll({
            where: Object.assign(Object.assign({}, (validStatus && { status: validStatus })), (validTopic && { topic: validTopic })),
        });
        res.status(200).json(orders);
    }
    catch (error) {
        next(api_error_1.ApiError.internal(`Error fetching orders: ${error.message}`));
    }
});
exports.getOrders = getOrders;
const updatePrice = (id, cost) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Order.findByPk(id);
        if (!order) {
            throw api_error_1.ApiError.notFound("Order not found");
        }
        order.cost = cost;
        yield order.save();
    }
    catch (error) {
        throw api_error_1.ApiError.internal(`Error updating price for order ${id}: ${error.message}`);
    }
});
exports.updatePrice = updatePrice;
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
const updatePaymentStatus = (id, paymentStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Order.findByPk(id);
        if (!order) {
            throw api_error_1.ApiError.notFound("Order not found");
        }
        if (!Object.values(payment_status_enum_1.PaymentStatusEnum).includes(paymentStatus)) {
            throw api_error_1.ApiError.badRequest("Invalid payment status");
        }
        order.payment_status = paymentStatus;
        yield order.save();
    }
    catch (error) {
        throw api_error_1.ApiError.internal(`Error updating payment status for order ${id}: ${error.message}`);
    }
});
exports.updatePaymentStatus = updatePaymentStatus;
const updateStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.Order.findByPk(id);
        if (!order) {
            throw api_error_1.ApiError.notFound("Order not found");
        }
        if (!Object.values(status_enum_1.StatusEnum).includes(status)) {
            throw api_error_1.ApiError.badRequest("Invalid status");
        }
        order.status = status;
        yield order.save();
    }
    catch (error) {
        throw api_error_1.ApiError.internal(`Error updating status for order ${id}: ${error.message}`);
    }
});
exports.updateStatus = updateStatus;
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
