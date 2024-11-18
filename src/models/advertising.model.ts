import {Model, DataTypes, Optional} from 'sequelize';
import {sequelize} from "../config/database";

export interface AdvertisingAttributes {
    id: number;
    userId: number;
    make: string;
    model: string;
    price: number;
    currency: 'USD' | 'EUR' | 'UAH';
    exchangeRate: number;
    originalPrice: number;
    status: 'pending' | 'active' | 'inactive';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AdvertisingCreationAttributes extends Optional<AdvertisingAttributes, 'id'> {
}

export class Advertising extends Model<AdvertisingAttributes, AdvertisingCreationAttributes> implements AdvertisingAttributes {
    id!: number;
    userId!: number;
    make!: string;
    model!: string;
    price!: number;
    currency!: 'USD' | 'EUR' | 'UAH';
    exchangeRate!: number;
    originalPrice!: number;
    status!: 'pending' | 'active' | 'inactive';
    createdAt?: Date;
    updatedAt?: Date;
}

Advertising.init(
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {type: DataTypes.INTEGER, allowNull: false},
        make: {type: DataTypes.STRING, allowNull: false},
        model: {type: DataTypes.STRING, allowNull: false},
        price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
        currency: {type: DataTypes.ENUM('USD', 'EUR', 'UAH'), allowNull: false},
        exchangeRate: {type: DataTypes.DECIMAL(10, 4), allowNull: false},
        originalPrice: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
        status: {type: DataTypes.ENUM('pending', 'active', 'inactive'), defaultValue: 'pending'},
        createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        updatedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    },
    {
        sequelize,
        modelName: 'Advertising',
        tableName: 'advertisings',
        timestamps: false,
        underscored: true,
    }
);
