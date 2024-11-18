import {Request, Response, NextFunction, RequestHandler} from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const validateUserData: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const {error} = userSchema.validate(req.body);
    if (error) {
        res.status(400).json({message: error.message});
    } else {
        next();
    }
};
