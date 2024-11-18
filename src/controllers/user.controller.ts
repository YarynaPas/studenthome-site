import {Request, Response, NextFunction} from 'express';
import {userService} from '../services/user.service';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params;
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

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params;
    try {
        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return next(new Error('User not found'));
        }
        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {id} = req.params;
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
