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
exports.orderRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const multer_1 = __importDefault(require("multer"));
const manager_controller_1 = require("../controllers/manager.controller");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter.get('/', auth_middleware_1.authenticateUser, order_controller_1.getOrders);
orderRouter.get('/:id', auth_middleware_1.authenticateUser, order_controller_1.getOrderById);
orderRouter.post('/', auth_middleware_1.authenticateUser, order_controller_1.createOrder);
orderRouter.delete('/:id', auth_middleware_1.authenticateUser, order_controller_1.deleteOrder);
orderRouter.get('/status', auth_middleware_1.authenticateUser, order_controller_1.getOrdersByStatus);
orderRouter.put('/:id/status', auth_middleware_1.authenticateUser, order_controller_1.updateOrderStatus);
const upload = (0, multer_1.default)({ dest: "uploads/" });
orderRouter.put("/:id/attach-file", upload.single("file"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        yield (0, manager_controller_1.attachFileToOrder)(id, file);
        res.status(200).json({ message: "File attached successfully" });
    }
    catch (error) {
        next(error);
    }
}));
orderRouter.get("/:id/download", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, order_controller_1.downloadFile)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
