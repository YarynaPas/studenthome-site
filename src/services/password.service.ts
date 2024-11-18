import bcrypt from 'bcrypt'

class PasswordService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 8)
    }

    async comparePassword(
        password: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}

export const passwordService = new PasswordService();