"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Subject extends sequelize_1.Model {
}
exports.Subject = Subject;
Subject.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    subject_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    discipline_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: 'subjects',
    modelName: 'Subject',
    timestamps: false,
    underscored: true,
});
