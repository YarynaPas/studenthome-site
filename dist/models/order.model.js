"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const status_enum_1 = require("../enum/status-enum");
const payment_status_enum_1 = require("../enum/payment-status-enum");
const discipline_model_1 = require("./discipline.model");
const subject_model_1 = require("./subject.model");
const orders_type_enum_1 = require("../enum/orders-type-enum");
const user_model_1 = require("./user.model");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    discipline_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: discipline_model_1.Discipline,
            key: 'id',
        },
    },
    subject_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: subject_model_1.Subject,
            key: 'id',
        },
    },
    subject_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    application_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    cost: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    submission_date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    author_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(status_enum_1.StatusEnum),
        allowNull: false,
        defaultValue: status_enum_1.StatusEnum.APPLICATION_SUBMITTED,
    },
    topic: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    number_of_pages: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    payment_status: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(payment_status_enum_1.PaymentStatusEnum),
        allowNull: false,
        defaultValue: payment_status_enum_1.PaymentStatusEnum.NOT_PAID,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(orders_type_enum_1.OrdersTypesEnum),
        allowNull: false,
    },
    file_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    social_media: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: false,
    underscored: true,
});
Order.belongsTo(discipline_model_1.Discipline, { foreignKey: 'discipline_id' });
Order.belongsTo(subject_model_1.Subject, { foreignKey: 'subject_id' });
Order.belongsTo(user_model_1.User, { foreignKey: 'user_id' });
