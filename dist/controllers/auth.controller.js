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
const role_type_enum_1 = require("../enum/role-type-enum");
class AuthController {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(api_error_1.ApiError.badRequest('Електронна пошта та пароль є обов\'язковими'));
                }
                const existingUser = yield user_model_1.User.findOne({ where: { email } });
                if (existingUser) {
                    return next(api_error_1.ApiError.badRequest('Користувач з таким емейлом вже існує'));
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield user_model_1.User.create({
                    email,
                    password: hashedPassword,
                    role: role_type_enum_1.RoleTypeEnum.User,
                });
                if (!newUser) {
                    return next(api_error_1.ApiError.internal('Не вдалося створити користувача'));
                }
                yield email_service_1.emailService.sendMail(email, email_type_1.emailType.WELCOME, {
                    userName: email,
                });
                res.status(201).json({ message: 'Реєстрація успішна', user: { id: newUser.id, email: newUser.email } });
            }
            catch (error) {
                console.error("Error in signUp:", error); // Логування помилки
                next(api_error_1.ApiError.internal('Помилка при реєстрації користувача'));
            }
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return next(api_error_1.ApiError.badRequest('Електронна пошта та пароль є обов\'язковими'));
                }
                const user = yield user_model_1.User.findOne({ where: { email } });
                if (!user) {
                    return next(api_error_1.ApiError.notFound('Користувач не знайдений'));
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return next(api_error_1.ApiError.unauthorized('Невірний пароль'));
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ message: 'Увійшли успішно', token });
            }
            catch (error) {
                console.error("Error in signIn:", error); // Логування помилки
                next(api_error_1.ApiError.internal('Помилка при вході користувача'));
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    return next(api_error_1.ApiError.badRequest('Електронна пошта є обов\'язковою'));
                }
                const user = yield user_model_1.User.findOne({ where: { email } });
                if (!user) {
                    return next(api_error_1.ApiError.notFound('Користувач не знайдений'));
                }
                const resetToken = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.JWT_SECRET, { expiresIn: '15m' });
                yield email_service_1.emailService.sendMail(email, email_type_1.emailType.RESET_PASSWORD, {
                    resetLink: `${config_1.default.CLIENT_URL}/reset-password?token=${resetToken}`,
                });
                res.status(200).json({ message: 'Інструкції для скидання пароля надіслано на вашу пошту' });
            }
            catch (error) {
                console.error("Error in forgotPassword:", error);
                next(api_error_1.ApiError.internal('Помилка при запиті на скидання пароля'));
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, newPassword } = req.body;
                if (!token || !newPassword) {
                    return next(api_error_1.ApiError.badRequest('Токен та новий пароль є обов\'язковими'));
                }
                let payload;
                try {
                    payload = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
                }
                catch (err) {
                    return next(api_error_1.ApiError.unauthorized('Невірний або застарілий токен'));
                }
                const user = yield user_model_1.User.findByPk(payload.id);
                if (!user) {
                    return next(api_error_1.ApiError.notFound('Користувач не знайдений'));
                }
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                user.password = hashedPassword;
                yield user.save();
                res.status(200).json({ message: 'Пароль успішно змінено' });
            }
            catch (error) {
                console.error("Error in resetPassword:", error);
                next(api_error_1.ApiError.internal('Помилка при скиданні пароля'));
            }
        });
    }
}
exports.AuthController = AuthController;
