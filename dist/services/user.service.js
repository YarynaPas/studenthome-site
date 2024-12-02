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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const password_service_1 = require("./password.service");
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findAll();
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findByPk(id);
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield password_service_1.passwordService.hashPassword(userData.password);
            const newUserData = {
                id: userData.number,
                accountType: userData.accountType,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
            };
            const user = yield user_model_1.User.create(newUserData);
            return user;
        });
    }
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findByPk(id);
            if (user) {
                yield user.update(updateData);
                return user;
            }
            return null;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.User.findByPk(id);
            if (user) {
                yield user.destroy();
                return true;
            }
            return false;
        });
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
