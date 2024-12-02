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
exports.CarRepository = void 0;
const car_model_1 = require("../models/car.model");
class CarRepository {
    getCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield car_model_1.Car.findAll();
        });
    }
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield car_model_1.Car.findByPk(id);
        });
    }
    createCar(carData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield car_model_1.Car.create(carData);
        });
    }
    deleteCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield car_model_1.Car.findByPk(id);
            if (!car)
                return false;
            yield car.destroy();
            return true;
        });
    }
}
exports.CarRepository = CarRepository;
