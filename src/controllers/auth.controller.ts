import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../config/config';
import { User } from '../models/user.model';
import { ApiError } from '../errors/api-error';
import { emailService } from '../services/email.service';
import { emailType } from '../enum/email-type';
import { RoleTypeEnum } from "../enum/role-type-enum";

export class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest('Електронна пошта та пароль є обов\'язковими'));
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return next(ApiError.badRequest('Користувач з таким емейлом вже існує'));
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                email,
                password: hashedPassword,
                role: RoleTypeEnum.User,
            });

            if (!newUser) {
                return next(ApiError.internal('Не вдалося створити користувача'));
            }

            await emailService.sendMail(email, emailType.WELCOME, {
                userName: email,
            });

            res.status(201).json({ message: 'Реєстрація успішна', user: { id: newUser.id, email: newUser.email } });
        } catch (error) {
            console.error("Error in signUp:", error); // Логування помилки
            next(ApiError.internal('Помилка при реєстрації користувача'));
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(ApiError.badRequest('Електронна пошта та пароль є обов\'язковими'));
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.notFound('Користувач не знайдений'));
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return next(ApiError.unauthorized('Невірний пароль'));
            }

            const token = jwt.sign({ id: user.id }, configs.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Увійшли успішно', token });
        } catch (error) {
            console.error("Error in signIn:", error); // Логування помилки
            next(ApiError.internal('Помилка при вході користувача'));
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;

            if (!email) {
                return next(ApiError.badRequest('Електронна пошта є обов\'язковою'));
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return next(ApiError.notFound('Користувач не знайдений'));
            }

            const resetToken = jwt.sign({ id: user.id }, configs.JWT_SECRET, { expiresIn: '15m' });

            await emailService.sendMail(email, emailType.RESET_PASSWORD, {
                resetLink: `${configs.CLIENT_URL}/reset-password?token=${resetToken}`,
            });

            res.status(200).json({ message: 'Інструкції для скидання пароля надіслано на вашу пошту' });
        } catch (error) {
            console.error("Error in forgotPassword:", error);
            next(ApiError.internal('Помилка при запиті на скидання пароля'));
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token, newPassword } = req.body;

            if (!token || !newPassword) {
                return next(ApiError.badRequest('Токен та новий пароль є обов\'язковими'));
            }

            let payload: any;
            try {
                payload = jwt.verify(token, configs.JWT_SECRET);
            } catch (err) {
                return next(ApiError.unauthorized('Невірний або застарілий токен'));
            }

            const user = await User.findByPk(payload.id);
            if (!user) {
                return next(ApiError.notFound('Користувач не знайдений'));
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Пароль успішно змінено' });
        } catch (error) {
            console.error("Error in resetPassword:", error);
            next(ApiError.internal('Помилка при скиданні пароля'));
        }
    }
}
