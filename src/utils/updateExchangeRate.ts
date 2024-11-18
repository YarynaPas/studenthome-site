import cron from 'node-cron';
import { updateCarPrice } from './exchange-rate';
import { Car } from '../models/car.model';

cron.schedule('0 0 * * *', async () => {
    const cars = await Car.findAll();
    cars.forEach(async (car) => {
        await updateCarPrice(car.id, car.originalPrice, car.currency) ;
    });
});
