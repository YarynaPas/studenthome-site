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
exports.AuthService = void 0;
const user_model_1 = require("../models/user.model");
const api_error_1 = require("../errors/api-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const role_type_enum_1 = require("../enum/role-type-enum");
class AuthService {
    signUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUserByEmail = yield user_model_1.User.findOne({ where: { email: userData.email } });
            if (existingUserByEmail) {
                throw api_error_1.ApiError.badRequest('Користувач з таким емейлом вже існує');
            }
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            const newUser = yield user_model_1.User.create({
                email: userData.email,
                password: hashedPassword,
                role: role_type_enum_1.RoleTypeEnum.User,
            });
            return newUser;
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ where: { email } });
            if (!user) {
                throw api_error_1.ApiError.badRequest('Невірний емейл або пароль');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw api_error_1.ApiError.badRequest('Невірний емейл або пароль');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.JWT_SECRET, {
                expiresIn: '6h',
            });
            return { user, token };
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ where: { email } });
            if (!user) {
                throw api_error_1.ApiError.badRequest('Користувача з таким емейлом не знайдено');
            }
            const resetToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.JWT_SECRET, {
                expiresIn: '6h',
            });
            return resetToken;
        });
    }
}
exports.AuthService = AuthService;
