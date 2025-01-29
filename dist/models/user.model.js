"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const role_type_enum_1 = require("../enum/role-type-enum");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(role_type_enum_1.RoleTypeEnum),
        allowNull: false,
        defaultValue: role_type_enum_1.RoleTypeEnum.User,
    },
    university: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    specialty: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    research_group: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    social_media: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: false,
    underscored: true,
});
