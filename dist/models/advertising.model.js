"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Advertising = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Advertising extends sequelize_1.Model {
}
exports.Advertising = Advertising;
Advertising.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    make: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: sequelize_1.DataTypes.ENUM('USD', 'EUR', 'UAH'), allowNull: false },
    exchangeRate: { type: sequelize_1.DataTypes.DECIMAL(10, 4), allowNull: false },
    originalPrice: { type: sequelize_1.DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM('pending', 'active', 'inactive'), defaultValue: 'pending' },
    createdAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updatedAt: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Advertising',
    tableName: 'advertisings',
    timestamps: false,
    underscored: true,
});
