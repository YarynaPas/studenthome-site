"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const order_model_1 = require("./order.model");
class Review extends sequelize_1.Model {
}
exports.Review = Review;
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: sequelize_1.DataTypes.STRING(500), // обмежуємо довжину коментаря
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'reviews',
    modelName: 'Review',
    timestamps: true,
    underscored: true,
});
order_model_1.Order.hasMany(Review, { foreignKey: 'order_id' });
Review.belongsTo(order_model_1.Order, { foreignKey: 'order_id' });
exports.default = Review;
