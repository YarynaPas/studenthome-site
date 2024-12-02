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
exports.userRepository = exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.User.findAll();
            }
            catch (error) {
                throw new Error('Error retrieving users');
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.User.findOne({ where: { id } });
            }
            catch (error) {
                throw new Error('Error retrieving user');
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.User.create(user);
            }
            catch (error) {
                throw new Error('Error creating user');
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_model_1.User.findByPk(id);
                if (!existingUser)
                    throw new Error('User not found');
                return yield existingUser.update(user);
            }
            catch (error) {
                throw new Error('Error updating user');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findByPk(id);
                if (!user)
                    throw new Error('User not found');
                yield user.destroy();
            }
            catch (error) {
                throw new Error('Error deleting user');
            }
        });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
