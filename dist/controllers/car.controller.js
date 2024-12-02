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
exports.editCarListing = exports.createCarListing = exports.deleteCar = exports.updateCar = exports.createCar = exports.getCarById = exports.getCars = void 0;
const car_model_1 = require("../models/car.model");
const bad_words_1 = require("../utils/bad-words");
const email_service_1 = require("../services/email.service");
const email_type_1 = require("../enum/email-type");
const regionEnum_1 = require("../enum/regionEnum");
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield car_model_1.Car.findAll();
        res.status(200).json(cars);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch cars', error });
    }
});
exports.getCars = getCars;
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.Car.findByPk(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        res.status(200).json(car);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch car', error });
    }
});
exports.getCarById = getCarById;
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { make, model, userId, price, currency, description, region } = req.body;
        if (!region) {
            res.status(400).json({ message: 'Region is required.' });
            return;
        }
        if (!Object.values(regionEnum_1.regionEnum).includes(region)) {
            res.status(400).json({ message: 'Invalid region.' });
            return;
        }
        const car = yield car_model_1.Car.create({
            make,
            model,
            userId,
            price,
            currency,
            description,
            region,
            originalPrice: price,
            status: 'active',
            exchangeRate: 1,
            editAttempts: 0,
            viewCount: 0
        });
        res.status(201).json({ message: 'Car created successfully', car });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create car', error });
    }
});
exports.createCar = createCar;
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.Car.findByPk(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        const { price, currency, description } = req.body;
        car.price = price;
        car.currency = currency;
        car.description = description;
        yield car.save();
        res.status(200).json({ message: 'Car updated successfully', car });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update car', error });
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.Car.findByPk(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        yield car.destroy();
        res.status(200).json({ message: 'Car deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error });
    }
});
exports.deleteCar = deleteCar;
const createCarListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, price, currency, description, region } = req.body;
        if ((0, bad_words_1.checkProfanity)(description)) {
            res.status(400).json({ message: 'Please revise your description, inappropriate content detected.' });
            return;
        }
        if (!region) {
            res.status(400).json({ message: 'Region is required.' });
            return;
        }
        if (!Object.values(regionEnum_1.regionEnum).includes(region)) {
            res.status(400).json({ message: 'Invalid region.' });
            return;
        }
        const car = yield car_model_1.Car.create({
            userId,
            price,
            currency,
            region,
            description,
            viewCount: 0,
            status: 'active',
            exchangeRate: 1,
            originalPrice: price,
            originalCurrency: currency,
            editAttempts: 0,
        });
        res.status(201).json({ message: 'Car listing created successfully', car });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create car listing', error });
    }
});
exports.createCarListing = createCarListing;
const editCarListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, newPrice, newCurrency, newDescription } = req.body;
        const car = yield car_model_1.Car.findByPk(carId);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        if ((0, bad_words_1.checkProfanity)(newDescription)) {
            car.editAttempts += 1;
            if (car.editAttempts >= 3) {
                car.status = 'inactive';
                yield car.save();
                yield email_service_1.emailService.sendMail('manager@gmail.com', email_type_1.emailType.MANAGER_NOTIFICATION, {
                    carId: car.id,
                    sellerEmail: 'seller@gmail.com',
                });
                res.status(400).json({
                    message: 'Too many failed edits, car is now inactive. Notification sent to manager.',
                });
                return;
            }
            yield car.save();
            res.status(400).json({
                message: 'Inappropriate content detected. Please revise the description.',
            });
            return;
        }
        car.price = newPrice;
        car.currency = newCurrency;
        car.description = newDescription;
        car.editAttempts = 0;
        car.status = 'active';
        yield car.save();
        res.status(200).json({ message: 'Car listing updated successfully', car });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to edit car listing', error });
    }
});
exports.editCarListing = editCarListing;
