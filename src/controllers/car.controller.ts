import { Request, Response } from 'express';
import { Car } from '../models/car.model';
import { checkProfanity } from '../utils/bad-words';
import { emailService } from '../services/email.service';
import { emailType } from '../enum/email-type';
import { regionEnum } from '../enum/regionEnum';

export const getCars = async (req: Request, res: Response): Promise<void> => {
    try {
        const cars = await Car.findAll();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cars', error });
    }
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch car', error });
    }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const { make, model, userId, price, currency, description, region } = req.body;

        if (!region) {
            res.status(400).json({ message: 'Region is required.' });
            return;
        }

        if (!Object.values(regionEnum).includes(region)) {
            res.status(400).json({ message: 'Invalid region.' });
            return;
        }

        const car = await Car.create({
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
    } catch (error) {
        res.status(500).json({ message: 'Failed to create car', error });
    }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const car = await Car.findByPk(req.params.id);

        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }

        const { price, currency, description } = req.body;
        car.price = price;
        car.currency = currency;
        car.description = description;

        await car.save();

        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error });
    }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
    try {
        const car = await Car.findByPk(req.params.id);

        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }

        await car.destroy();
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error });
    }
};

export const createCarListing = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, price, currency, description, region } = req.body;

        if (checkProfanity(description)) {
            res.status(400).json({ message: 'Please revise your description, inappropriate content detected.' });
            return;
        }

        if (!region) {
            res.status(400).json({ message: 'Region is required.' });
            return;
        }

        if (!Object.values(regionEnum).includes(region)) {
            res.status(400).json({ message: 'Invalid region.' });
            return;
        }

        const car = await Car.create({
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
    } catch (error) {
        res.status(500).json({ message: 'Failed to create car listing', error });
    }
};

export const editCarListing = async (req: Request, res: Response): Promise<void> => {
    try {
        const { carId, newPrice, newCurrency, newDescription } = req.body;

        const car = await Car.findByPk(carId);

        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }

        if (checkProfanity(newDescription)) {
            car.editAttempts += 1;

            if (car.editAttempts >= 3) {
                car.status = 'inactive';
                await car.save();

                await emailService.sendMail(
                    'manager@gmail.com',
                    emailType.MANAGER_NOTIFICATION,
                    {
                        carId: car.id,
                        sellerEmail: 'seller@gmail.com',
                    }
                );

                res.status(400).json({
                    message: 'Too many failed edits, car is now inactive. Notification sent to manager.',
                });
                return;
            }

            await car.save();
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

        await car.save();
        res.status(200).json({ message: 'Car listing updated successfully', car });
    } catch (error) {
        res.status(500).json({ message: 'Failed to edit car listing', error });
    }
};
