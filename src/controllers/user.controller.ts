import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { User } from "../models/user.model";
import { AuthenticatedRequest } from "../types/authenticated-request";

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserData = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const { password, ...userData } = user.toJSON();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return next(new Error('User not found'));
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { university, specialty, research_group, phone_number, social_media, full_name} = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        user.university = university || user.university;
        user.full_name = full_name || user.full_name;
        user.specialty = specialty || user.specialty;
        user.research_group = research_group || user.research_group;
        user.phone_number = phone_number || user.phone_number;
        user.social_media = social_media || user.social_media;

        await user.save();

        res.status(200).json({ message: 'User data updated successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const deleted = await userService.deleteUser(id);
        if (!deleted) {
            return next(new Error('User not found'));
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};
