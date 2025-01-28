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
exports.authorizeAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const authorizeAdmin = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                console.error('Authorization header is missing');
                res.status(401).json({ message: 'No token provided' });
                return;
            }
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
            if (!decoded.id) {
                console.error('Invalid token payload: missing user ID');
                res.status(401).json({ message: 'Invalid token' });
                return;
            }
            const user = yield user_model_1.User.findByPk(decoded.id);
            if (!user) {
                console.error('User not found');
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            if (!roles.includes(user.role)) {
                console.error(`User role '${user.role}' does not have access`);
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            req.user = user; // Повний об'єкт користувача
            next();
        }
        catch (error) {
            console.error('Authorization error:', error.message || error);
            res.status(401).json({ message: 'Invalid token' });
        }
    });
};
exports.authorizeAdmin = authorizeAdmin;
