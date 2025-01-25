import { User } from '../models/user.model';
import { passwordService } from './password.service';
import { RoleTypeEnum } from '../enum/role-type-enum';
import {ApiError} from "../errors/api-error";

export class UserService {
    async getAllUsers() {
        return await User.findAll();
    }

    async getUserData(userId: number) {
        const user = await User.findByPk(userId);

        if (!user) {
            throw ApiError.notFound('Користувач не знайдений');
        }

        return user;
    }
    async getUserById(id: string) {
        return await User.findByPk(id);
    }

    async createUser(userData: any) {
        const hashedPassword = await passwordService.hashPassword(userData.password);

        const newUserData = {
            email: userData.email,
            full_name: userData.full_name || null,
            password: hashedPassword,
            role:  RoleTypeEnum.User,
            university: userData.university || null,
            specialty: userData.specialty || null,
            research_group: userData.research_group || null,
            phone_number: userData.phone_number || null,
            social_media: userData.social_media || null,
        };

        const user = await User.create(newUserData);
        return user;
    }

    async updateUser(id: string, updateData: any) {
        const user = await User.findByPk(id);
        if (user) {
            await user.update(updateData);
            return user;
        }
        return null;
    }

    async deleteUser(id: string) {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }
}

export const userService = new UserService();
