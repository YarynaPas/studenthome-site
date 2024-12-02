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
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const user_model_1 = require("../models/user.model");
const api_error_1 = require("../errors/api-error");
const email_service_1 = require("../services/email.service");
const email_type_1 = require("../enum/email-type");
const subscribe_enum_1 = require("../enum/subscribe-enum");
const role_type_enum_1 = require("../enum/role-type-enum");
class AuthController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw api_error_1.ApiError.badRequest('All fields are required');
                }
                const existingUser1 = yield user_model_1.User.findOne({ where: { email } });
                if (existingUser1) {
                    throw api_error_1.ApiError.badRequest('User with this email already exists ');
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield user_model_1.User.create({
                    password: hashedPassword,
                    email,
                    role: role_type_enum_1.RoleTypeEnum.Buyer,
                    accountType: subscribe_enum_1.SubscribeEnum.BASIC,
                });
                yield email_service_1.emailService.sendMail(email, email_type_1.emailType.WELCOME, {
                    userName: email,
                });
                res.status(201).json({ message: 'Registration successful', user: { id: newUser.id, email: newUser.email } });
            }
            catch (error) {
                next(error);
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw api_error_1.ApiError.badRequest('Email and password are required');
                }
                const user = yield user_model_1.User.findOne({ where: { email } });
                if (!user) {
                    throw api_error_1.ApiError.notFound('user not found');
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw api_error_1.ApiError.unauthorized('incorrect password');
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Log in successful', token });
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    throw api_error_1.ApiError.badRequest('email are required');
                }
                const user = yield user_model_1.User.findOne({ where: { email } });
                if (!user) {
                    throw api_error_1.ApiError.notFound('user not found');
                }
                const resetToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.JWT_SECRET, { expiresIn: '15m' });
                yield email_service_1.emailService.sendMail(email, email_type_1.emailType.RESET_PASSWORD, {
                    resetLink: `${config_1.default.CLIENT_URL}/reset-password?token=${resetToken}`,
                });
                res.status(200).json({ message: 'instructions send ' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body;
                if (!token || !newPassword) {
                    throw api_error_1.ApiError.badRequest('token and new password are required');
                }
                let payload;
                try {
                    payload = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
                }
                catch (err) {
                    throw api_error_1.ApiError.unauthorized('invalid or expired token');
                }
                const user = yield user_model_1.User.findByPk(payload.id);
                if (!user) {
                    throw api_error_1.ApiError.notFound('user not found');
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                user.password = hashedPassword;
                yield user.save();
                res.status(200).json({ message: 'password changed' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
