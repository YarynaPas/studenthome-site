"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const regionEnum_1 = require("../enum/regionEnum");
class Car extends sequelize_1.Model {
}
exports.Car = Car;
Car.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    make: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    currency: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    exchangeRate: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    editAttempts: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    originalPrice: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    region: { type: sequelize_1.DataTypes.ENUM(...Object.values(regionEnum_1.regionEnum)), allowNull: false },
    viewCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    usdPrice: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    eurPrice: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
    uahPrice: { type: sequelize_1.DataTypes.FLOAT, allowNull: true },
}, {
    sequelize: database_1.sequelize,
    tableName: 'cars',
    modelName: 'Car',
    timestamps: true,
});
