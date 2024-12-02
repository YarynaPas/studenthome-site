"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const role_type_enum_1 = require("../enum/role-type-enum");
const subscribe_enum_1 = require("../enum/subscribe-enum");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(role_type_enum_1.RoleTypeEnum)),
        allowNull: false,
        defaultValue: role_type_enum_1.RoleTypeEnum.Buyer
    },
    accountType: { type: sequelize_1.DataTypes.ENUM(...Object.values(subscribe_enum_1.SubscribeEnum)), allowNull: false, defaultValue: 'BASIC' },
    status: { type: sequelize_1.DataTypes.ENUM('active', 'banned'), defaultValue: 'active' },
}, {
    sequelize: database_1.sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
});
