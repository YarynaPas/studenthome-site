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
exports.updateCarPrice = void 0;
const axios_1 = __importDefault(require("axios"));
const car_model_1 = require("../models/car.model");
const getExchangeRate = (baseCurrency, targetCurrency) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;
        const response = yield axios_1.default.get(url);
        // Знаходимо курс для вказаної валюти
        const rate = response.data.find((item) => item.ccy === targetCurrency && item.base_ccy === baseCurrency);
        return rate ? parseFloat(rate.sale) : 1;
    }
    catch (error) {
        throw new Error('Failed to fetch exchange rate');
    }
});
const updateCarPrice = (carId, basePrice, baseCurrency) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eurRate = yield getExchangeRate(baseCurrency, 'EUR');
        const uahRate = yield getExchangeRate(baseCurrency, 'UAH');
        const usdRate = yield getExchangeRate(baseCurrency, 'USD');
        const eurPrice = basePrice * eurRate;
        const uahPrice = basePrice * uahRate;
        const usdPrice = basePrice * usdRate;
        const car = yield car_model_1.Car.findByPk(carId);
        if (car) {
            car.price = basePrice;
            car.currency = baseCurrency;
            car.exchangeRate = usdRate;
            car.originalPrice = basePrice;
            yield car.save();
        }
    }
    catch (error) {
        console.error('Error updating car price:', error);
    }
});
exports.updateCarPrice = updateCarPrice;
