"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configs = {
    APP_PORT: process.env.PORT || 3003,
    SMPT_EMAIL: process.env.SMPT_EMAIL,
    SMPT_PASSWORD: process.env.SMPT_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET || 'jwtSecret',
    CLIENT_URL: process.env.CLIENT_URL,
    ADMIN_EMAIL: 'manager@gmail.com',
};
exports.default = configs;
