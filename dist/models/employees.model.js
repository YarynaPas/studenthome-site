"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const desceplines_type_enum_1 = require("../enum/desceplines-type-enum");
class Employee extends sequelize_1.Model {
}
exports.Employee = Employee;
Employee.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    descipline: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(desceplines_type_enum_1.DisciplinesTypeEnum)),
        allowNull: false
    },
    subject: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    desciplines_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    subjects_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: database_1.sequelize,
    tableName: 'employees',
    modelName: 'Employee',
    timestamps: true,
    underscored: true,
});
