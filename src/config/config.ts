import dotenv from 'dotenv';

dotenv.config();
const configs = {
    APP_PORT: process.env.PORT || 3002,
    SMPT_EMAIL: process.env.SMPT_EMAIL,
    SMPT_PASSWORD: process.env.SMPT_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET || 'jwtSecret',
    CLIENT_URL: process.env.CLIENT_URL,
    MANAGER_EMAIL: 'manager@gmail.com',
};

export default configs;
