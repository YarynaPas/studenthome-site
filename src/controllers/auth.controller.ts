import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../config/config';
import {User} from '../models/user.model';
import {ApiError} from '../errors/api-error';
import {emailService} from '../services/email.service';
import {emailType} from '../enum/email-type';
import {SubscribeEnum} from "../enum/subscribe-enum";
import {RoleTypeEnum} from "../enum/role-type-enum";

export class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                throw ApiError.badRequest('All fields are required');
            }

            const existingUser1 = await User.findOne({where: {email}});
            if (existingUser1) {
                throw ApiError.badRequest('User with this email already exists ');
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                password: hashedPassword,
                email,
                role: RoleTypeEnum.Buyer,
                accountType: SubscribeEnum.BASIC,
            });

            await emailService.sendMail(email, emailType.WELCOME, {
                userName: email,
            });

            res.status(201).json({message: 'Registration successful', user: {id: newUser.id, email: newUser.email}});
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                throw ApiError.badRequest('Email and password are required');
            }

            const user = await User.findOne({where: {email}});
            if (!user) {
                throw ApiError.notFound('user not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw ApiError.unauthorized('incorrect password');
            }

            const token = jwt.sign({id: user.id}, configs.JWT_SECRET, {expiresIn: '1h'});

            res.status(200).json({message: 'Log in successful', token});
        } catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email} = req.body;

            if (!email) {
                throw ApiError.badRequest('email are required');
            }

            const user = await User.findOne({where: {email}});
            if (!user) {
                throw ApiError.notFound('user not found');
            }

            const resetToken = jwt.sign({id: user.id}, configs.JWT_SECRET, {expiresIn: '15m'});

            await emailService.sendMail(email, emailType.RESET_PASSWORD, {
                resetLink: `${configs.CLIENT_URL}/reset-password?token=${resetToken}`,
            });

            res.status(200).json({message: 'instructions send '});
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {token, newPassword} = req.body;

            if (!token || !newPassword) {
                throw ApiError.badRequest('token and new password are required');
            }

            let payload: any;
            try {
                payload = jwt.verify(token, configs.JWT_SECRET);
            } catch (err) {
                throw ApiError.unauthorized('invalid or expired token');
            }

            const user = await User.findByPk(payload.id);
            if (!user) {
                throw ApiError.notFound('user not found');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            res.status(200).json({message: 'password changed'});
        } catch (error) {
            next(error);
        }
    }
}
