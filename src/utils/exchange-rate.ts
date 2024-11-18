import axios from 'axios';
import { Car } from '../models/car.model';


const getExchangeRate = async (baseCurrency: string, targetCurrency: string): Promise<number> => {
    try {

        const url = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;
        const response = await axios.get(url);

        // Знаходимо курс для вказаної валюти
        const rate = response.data.find((item: any) => item.ccy === targetCurrency && item.base_ccy === baseCurrency);

        return rate ? parseFloat(rate.sale) : 1;
    } catch (error) {
        throw new Error('Failed to fetch exchange rate');
    }
};


export const updateCarPrice = async (carId: number, basePrice: number, baseCurrency: string) => {
    try {
        const eurRate = await getExchangeRate(baseCurrency, 'EUR');
        const uahRate = await getExchangeRate(baseCurrency, 'UAH');
        const usdRate = await getExchangeRate(baseCurrency, 'USD');

        const eurPrice = basePrice * eurRate;
        const uahPrice = basePrice * uahRate;
        const usdPrice = basePrice * usdRate;

        const car = await Car.findByPk(carId);
        if (car) {
            car.price = basePrice;
            car.currency = baseCurrency;
            car.exchangeRate = usdRate;
            car.originalPrice = basePrice;
            await car.save();
        }
    } catch (error) {
        console.error('Error updating car price:', error);
    }
};
