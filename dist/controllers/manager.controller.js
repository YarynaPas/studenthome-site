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
exports.deleteInvalidAd = exports.banUser = void 0;
const user_model_1 = require("../models/user.model");
const car_model_1 = require("../models/car.model");
const banUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_model_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.status = 'banned';
        yield user.save();
        res.status(200).json({ message: 'User has been banned successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to ban user', error });
    }
});
exports.banUser = banUser;
const deleteInvalidAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.carId;
        const car = yield car_model_1.Car.findByPk(carId);
        if (!car) {
            res.status(404).json({ message: 'Car listing not found' });
            return;
        }
        car.status = 'inactive';
        yield car.save();
        res.status(200).json({ message: 'Car listing has been marked as inactive' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete invalid car listing', error });
    }
});
exports.deleteInvalidAd = deleteInvalidAd;
