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
exports.adminRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const manager_controller_1 = require("../controllers/manager.controller");
const authorize_middleware_1 = require("../middlewares/authorize.middleware");
const role_type_enum_1 = require("../enum/role-type-enum");
const adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
adminRouter.get('/orders', (0, authorize_middleware_1.authorizeAdmin)([role_type_enum_1.RoleTypeEnum.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, manager_controller_1.getOrders)(req, res, next);
        if (!res.headersSent) {
            res.status(200).json(orders);
        }
    }
    catch (error) {
        next(error);
    }
}));
adminRouter.put('/orders/:id/price', (0, authorize_middleware_1.authorizeAdmin)([role_type_enum_1.RoleTypeEnum.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { cost } = req.body;
        yield (0, manager_controller_1.updatePrice)(id, cost);
        if (!res.headersSent) {
            res.status(200).json({ message: 'Price updated successfully' });
        }
    }
    catch (error) {
        next(error);
    }
}));
adminRouter.put('/orders/:id/status', (0, authorize_middleware_1.authorizeAdmin)([role_type_enum_1.RoleTypeEnum.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        yield (0, manager_controller_1.updateStatus)(id, status);
        if (!res.headersSent) {
            res.status(200).json({ message: 'Status updated successfully' });
        }
    }
    catch (error) {
        next(error);
    }
}));
adminRouter.put('/orders/:id/payment-status', (0, authorize_middleware_1.authorizeAdmin)([role_type_enum_1.RoleTypeEnum.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { payment_status } = req.body;
        yield (0, manager_controller_1.updatePaymentStatus)(id, payment_status);
        if (!res.headersSent) {
            res.status(200).json({ message: 'Payment status updated successfully' });
        }
    }
    catch (error) {
        next(error);
    }
}));
const upload = (0, multer_1.default)({ dest: "uploads/" });
adminRouter.put("/orders/:id/attach-file", (0, authorize_middleware_1.authorizeAdmin)([role_type_enum_1.RoleTypeEnum.Admin]), upload.single("file"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
adminRouter.get("/orders/:id/download", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, manager_controller_1.downloadFile)(req, res);
    }
    catch (error) {
        next(error);
    }
}));
