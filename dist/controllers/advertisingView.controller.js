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
exports.getCarStatistics = exports.incrementViewCount = void 0;
const advertisingView_service_1 = require("../services/advertisingView.service");
const incrementViewCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        yield advertisingView_service_1.advertisingViewService.incrementViewCount(Number(carId));
        res.status(200).json({ message: 'View count updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update view count', error });
    }
});
exports.incrementViewCount = incrementViewCount;
const getCarStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carId = req.params.id;
        const statistics = yield advertisingView_service_1.advertisingViewService.getCarStatistics(Number(carId));
        res.status(200).json(statistics);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch statistics', error });
    }
});
exports.getCarStatistics = getCarStatistics;
