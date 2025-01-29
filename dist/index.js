"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = require("./routers/user.router");
const config_1 = __importDefault(require("./config/config"));
const api_error_1 = require("./errors/api-error");
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const orders_router_1 = require("./routers/orders.router");
const cors_1 = __importDefault(require("cors"));
const rewiews_router_1 = require("./routers/rewiews.router");
const admin_router_1 = require("./routers/admin.router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://studenthome.com.ua',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//
app.use('/users', user_router_1.userRouter);
app.use('/auth', auth_router_1.default);
app.use('/order', orders_router_1.orderRouter);
app.use('/admin', admin_router_1.adminRouter);
app.use('/reviews', rewiews_router_1.reviewRouter);
app.use('*', (err, req, res, next) => {
    if (err instanceof api_error_1.ApiError) {
        res.status(err.statusCode || 500).send(err.message);
    }
    else {
        res.status(500).send('Internal Server Error');
    }
});
process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error.message, error.stack);
    process.exit(1);
});
const port = config_1.default.APP_PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
