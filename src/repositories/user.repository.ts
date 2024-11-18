import {User, UserAttributes, UserCreationAttributes} from '../models/user.model';

export class UserRepository {
    async getAll() {
        try {
            return await User.findAll();
        } catch (error: any) {
            throw new Error('Error retrieving users');
        }
    }

    async getById(id: number) {
        try {
            return await User.findOne({where: {id}});
        } catch (error: any) {
            throw new Error('Error retrieving user');
        }
    }

    async create(user: UserCreationAttributes) {
        try {
            return await User.create(user);
        } catch (error: any) {
            throw new Error('Error creating user');
        }
    }

    async update(id: number, user: Partial<UserAttributes>) {
        try {
            const existingUser = await User.findByPk(id);
            if (!existingUser) throw new Error('User not found');
            return await existingUser.update(user as UserAttributes);
        } catch (error: any) {
            throw new Error('Error updating user');
        }
    }

    async delete(id: number) {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error('User not found');
            await user.destroy();
        } catch (error: any) {
            throw new Error('Error deleting user');
        }
    }
}

export const userRepository = new UserRepository();
