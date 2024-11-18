import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Car } from '../models/car.model';

export const banUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.status = 'banned';
        await user.save();

        res.status(200).json({ message: 'User has been banned successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to ban user', error });
    }
};

export const deleteInvalidAd = async (req: Request, res: Response): Promise<void> => {
    try {
        const carId = req.params.carId;
        const car = await Car.findByPk(carId);

        if (!car) {
            res.status(404).json({ message: 'Car listing not found' });
            return;
        }

        car.status = 'inactive';
        await car.save();

        res.status(200).json({ message: 'Car listing has been marked as inactive' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete invalid car listing', error });
    }
};
