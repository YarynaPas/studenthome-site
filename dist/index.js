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
const car_router_1 = require("./routers/car.router");
const advertising_router_1 = require("./routers/advertising.router");
const manager_router_1 = require("./routers/manager.router");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/users', user_router_1.userRouter);
app.use('/auth', auth_router_1.default);
app.use('/cars', car_router_1.carRouter);
app.use('stats', advertising_router_1.advertisingViewRouter);
app.use('/manager', manager_router_1.managerRouter);
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
const port = config_1.default.APP_PORT || 3002;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
