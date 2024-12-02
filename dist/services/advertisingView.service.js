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
exports.advertisingViewService = exports.AdvertisingViewService = void 0;
const advertising_views_model_1 = require("../models/advertising.views.model");
const car_model_1 = require("../models/car.model");
const database_1 = require("../config/database");
class AdvertisingViewService {
    incrementViewCount(advertisingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewDate = new Date();
            const existingView = yield advertising_views_model_1.AdvertisingView.findOne({
                where: {
                    advertisingId,
                    viewDate: viewDate.toISOString().split('T')[0],
                },
            });
            if (existingView) {
                existingView.views += 1;
                yield existingView.save();
            }
            else {
                yield advertising_views_model_1.AdvertisingView.create({
                    advertisingId,
                    viewDate: viewDate,
                    views: 1,
                });
            }
            const car = yield car_model_1.Car.findByPk(advertisingId);
            if (car) {
                car.viewCount += 1;
                yield car.save();
            }
        });
    }
    getCarStatistics(carId) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield car_model_1.Car.findByPk(carId);
            if (!car) {
                throw new Error('Car not found');
            }
            const viewsPerDay = yield advertising_views_model_1.AdvertisingView.sum('views', {
                where: {
                    advertisingId: car.id,
                    viewDate: new Date().toISOString().split('T')[0],
                },
            });
            const averagePriceInRegion = yield car_model_1.Car.findOne({
                attributes: [
                    [database_1.sequelize.fn('AVG', database_1.sequelize.col('price')), 'avgPrice'],
                ],
                where: { region: car.region },
            });
            const averagePriceInUkraine = yield car_model_1.Car.findOne({
                attributes: [
                    [database_1.sequelize.fn('AVG', database_1.sequelize.col('price')), 'avgPrice'],
                ],
            });
            return {
                viewsPerDay: viewsPerDay || 0,
                averagePriceInRegion: averagePriceInRegion === null || averagePriceInRegion === void 0 ? void 0 : averagePriceInRegion.get('avgPrice'),
                averagePriceInUkraine: averagePriceInUkraine === null || averagePriceInUkraine === void 0 ? void 0 : averagePriceInUkraine.get('avgPrice'),
            };
        });
    }
}
exports.AdvertisingViewService = AdvertisingViewService;
exports.advertisingViewService = new AdvertisingViewService();
