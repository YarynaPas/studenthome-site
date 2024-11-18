import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { regionEnum } from '../enum/regionEnum';

export class Car extends Model {
    id!: number;
    make!: string;
    model!: string;
    userId!: number;
    price!: number;
    currency!: string;
    exchangeRate!: number;
    status!: string;
    editAttempts!: number;
    description!: string;
    originalPrice!: number;
    region!: regionEnum;
    viewCount!: number;
    usdPrice!: number;
    eurPrice!: number;
    uahPrice!: number;


}

Car.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        make: { type: DataTypes.STRING, allowNull: false },
        model: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        currency: { type: DataTypes.STRING, allowNull: false },
        exchangeRate: { type: DataTypes.FLOAT, allowNull: false },
        status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
        editAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
        description: { type: DataTypes.STRING, allowNull: true },
        originalPrice: { type: DataTypes.FLOAT, allowNull: true },
        region: { type: DataTypes.ENUM(...Object.values(regionEnum)), allowNull: false },
        viewCount: { type: DataTypes.INTEGER, defaultValue: 0 },
        usdPrice: { type: DataTypes.FLOAT, allowNull: true },
        eurPrice: { type: DataTypes.FLOAT, allowNull: true },
        uahPrice: { type: DataTypes.FLOAT, allowNull: true },

    },
    {
        sequelize,
        tableName: 'cars',
        modelName: 'Car',
        timestamps: true,
    }
);
