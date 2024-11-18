import {User} from '../models/user.model';
import {ApiError} from '../errors/api-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from '../config/config';
import {RoleTypeEnum} from "../enum/role-type-enum";
import {SubscribeEnum} from "../enum/subscribe-enum";

export class AuthService {
    public async signUp(userData: any): Promise<any> {
        const existingUserByEmail = await User.findOne({where: {email: userData.email}});
        if (existingUserByEmail) {
            throw ApiError.badRequest('user with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = await User.create({
            email: userData.email,
            password: hashedPassword,
            role: RoleTypeEnum.Buyer,
            accountType: SubscribeEnum.BASIC,
        });

        return newUser;
    }

    public async signIn(email: string, password: string): Promise<any> {
        const user = await User.findOne({where: {email}});

        if (!user) {
            throw ApiError.badRequest('incorrect password or login .');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw ApiError.badRequest('incorrect password or login');
        }

        return user;
    }

    public async forgotPassword(email: string): Promise<string> {
        const user = await User.findOne({where: {email}});

        if (!user) {
            throw ApiError.badRequest('user with this email not found');
        }

        const resetToken = jwt.sign({id: user.id, email: user.email}, configs.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        return resetToken;
    }
}
