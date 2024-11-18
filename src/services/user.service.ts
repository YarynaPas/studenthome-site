import {User} from '../models/user.model';
import {passwordService} from './password.service';

export class UserService {
    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(id: string) {
        return await User.findByPk(id);
    }

    async createUser(userData: any) {
        const hashedPassword = await passwordService.hashPassword(userData.password);

        const newUserData = {
            id: userData.number,
            accountType: userData.accountType,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            email: userData.email,
            password: hashedPassword,
            role: userData.role,
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
